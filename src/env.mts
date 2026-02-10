import * as dotenv from "dotenv"
dotenv.config()
export const {DB_URL, HOST, PORT, CLUSTER_URL, DOCKER_ENV} = process.env
export const isRunningInDocker= DOCKER_ENV==="true"? true: true
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string


