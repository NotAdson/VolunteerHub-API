import { verifyJWT } from "../authentication/Authenticator.js"
import { createComment, getCommentsFromPost, deleteComment } from "../controllers/Comment.controller.js"
import { CommentValidator } from "../middleware/Comment.validator.js"
import { Router } from "express"

const routerComment = Router()
const instanceCommentValidator = new CommentValidator()

routerComment.post("/create-comment", verifyJWT,instanceCommentValidator.createCommentValidation, async (req, res)=>{
    return await createComment(req, res)
})
routerComment.get("/comments/get-from-post/:postId", instanceCommentValidator.getCommentsFromPostValidation, async (req, res) => {
    return await getCommentsFromPost(req, res)
})
routerComment.delete("/comments/delete", verifyJWT, instanceCommentValidator.deleteCommentValidation, async (req, res)=>{
    return await deleteComment(req, res)
})

export {routerComment}