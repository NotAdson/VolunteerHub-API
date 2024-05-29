import express from "express"
import { routerUser } from "./routes/User.router.js"
import { routerPost } from "./routes/Post.router.js"
import { routerComment } from "./routes/Comment.router.js"
import { tryToConnect } from "./database/connection.js"
import cors from 'cors'

const server = express()
const port = 8001

server.use(express.json())
server.use(cors())
server.use(routerUser)
server.use(routerPost)
server.use(routerComment)

server.listen(port, () => {
    tryToConnect()
    console.log("Running")
})

export default server