import 'module-alias/register.js'

import express from 'express'
import type { Application } from "express"
import http from "http"
import mongoose from 'mongoose'
import cors from "cors"
import { CLUSTER_URL, DB_URL, isRunningInDocker } from './env.mjs'
import { Server } from 'socket.io'
import { emit } from 'process'


const app : Application = express()


const url = isRunningInDocker? CLUSTER_URL: DB_URL
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/todo', (await import('@routes/index.routes.js')).default)
const server = http.createServer(app)
export const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});
io.on("connection", (socket) =>{
    console.log("New socket connection")
    socket.on("changes", ()=>{
        io.emit("changes")
    })
})
mongoose.connect(CLUSTER_URL as string)
.then(() => {
    console.log('Connected to MongoDB')
    const PORT = process.env.PORT || 8000
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err)
})

