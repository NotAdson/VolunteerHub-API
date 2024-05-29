import { Router } from "express"
import { createPost, getPost, getAllPosts,updateTitle, updateContent, deletePost } from "../controllers/Post.controller.js" 
import { PostValidator } from "../middleware/Post.validator.js"
import { verifyJWT } from "../authentication/Authenticator.js"

const routerPost = Router()

const instancePostValidator = new PostValidator()

routerPost.post("/create-post", verifyJWT, instancePostValidator.createPostValidation, async (req, res) =>{
    return await createPost(req, res)
})

routerPost.get("/posts/get", instancePostValidator.getPostValidation, async (req, res) =>{
    return await getPost(req, res)
})

routerPost.get("/posts/getAll", async (req, res) => {
    return await getAllPosts(req, res)
})

routerPost.patch("/posts/update-title", verifyJWT, instancePostValidator.updateTitleValidation, async (req, res)=>{
    return await updateTitle(req, res)
})

routerPost.patch("/posts/update-content", verifyJWT, instancePostValidator.updateContentValidation, async (req, res)=>{
    return await updateContent(req, res)
})

routerPost.delete("/post/delete-post", verifyJWT, instancePostValidator.deletePostValidation, async (req, res)=>{
    return await deletePost(req, res)
})

export {routerPost}