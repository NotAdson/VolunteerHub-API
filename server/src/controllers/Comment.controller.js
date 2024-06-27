import { CommentService } from "../services/Comment.service.js"
import { ERROS } from "../shared/messages.js"

const instanceCommentService = new CommentService()

export async function createComment(req, res){
    try{
        const { comment, postId} = req.body
        const userId = req.userId
        const response = await instanceCommentService.createComment(comment, userId, postId)

        return res.status(response.statusValue).json({
            message: response.message
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL}`})
    }
}

export async function getCommentsFromPost(req, res){
    try{
        const { postId } = req.params
        const response = await instanceCommentService.getCommentsFromPost(postId)

        return res.status(response.statusValue).json({
            message: response.message,
            content: response.content
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL}`})
    }

}

export async function deleteComment(req, res){
    try{
        const { commentId } = req.body
        const userId = req.userId
        const response = await instanceCommentService.deleteComment(commentId, userId)

        return res.status(response.statusValue).json({message: response.message})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL}`})
    }
}