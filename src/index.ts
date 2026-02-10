import 'module-alias/register.js'

import express from 'express'
import type { Application } from "express"
import http from "http"
import mongoose from 'mongoose'
import cors from "cors"
import { CLUSTER_URL, DB_URL, isRunningInDocker } from './env.mjs'
import { Server } from 'socket.io'
import pino from "pino"
import type { TaskComponent } from './interfaces/interfaces.js'
import router from '@routes/index.routes.js'
export const logger = pino()

const app : Application = express()


const url = isRunningInDocker? CLUSTER_URL: DB_URL
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/todo', router)
const server = http.createServer(app)

server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Erreur Fatale : Le port ${err.port} est déjà utilisé.`);
    } else {
        console.error('Erreur du serveur HTTP :', err);
    }
    process.exit(1); 
});

export const io = new Server(server,{
    cors: {
        origin: "*",
    }
});
io.on("connect", (socket) =>{
    console.log("New socket connection")
    socket.on("adding", (data: TaskComponent)=>{
        console.log("adding task")
        console.log({data})
        socket.broadcast.emit("adding", data)
    })
    socket.on("removing", (data: TaskComponent)=>{
        console.log("removing task")
        console.log({data})
        socket.broadcast.emit("removing", data)
    })
    socket.on("updating", (data: TaskComponent)=>{
        console.log("updating")
        socket.broadcast.emit("updating", data)
        console.log({data})
    })
})
mongoose.connect(CLUSTER_URL as string)
.then(() => {
    console.log('Connected to MongoDB')
    if (!isRunningInDocker) {
        console.log("local mongo database")
        console.log({CLUSTER_URL});
        
    }
    const PORT = process.env.PORT || 8000
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err)
})

