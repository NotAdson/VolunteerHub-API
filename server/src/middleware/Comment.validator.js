import { ERROS } from "../shared/messages.js";

export class CommentValidator{
    async createCommentValidation(req, res, next){
        const { comment, postId } = req.body || {}
        const userId = req.userId
        const fields = ["comment", "postId"]
        const errors = []

        if(!userId){
            errors.push(`The field userId cannot be blank.`)
        }
        for (const field of fields) {
            if (!req.body[field]) {
                errors.push(`${ERROS.COMMENT_NEEDS} a/an ${field}`);
            }
        }
        
        if (errors.length) {
            return res.status(404).json({ message: errors });
        }
        
        next()
    }

    async getCommentsFromPostValidation(req, res, next){
        const { postId } = req.params
        if (!postId){
            return res.status(404).json({
                message: `Missing post's id`
            })
        }
        next()
    }

    async deleteCommentValidation(req, res, next){
        const { commentId, password } = req.body || {}
        const userId = req.userId
        const fields = ["commentId", "password"]
        const errors = []

        if(!userId){
            errors.push(`The field userId cannot be blank.`)
        }
        for (const field of fields) {
            if (!req.body[field]) {
                errors.push(`${ERROS.COMMENT_NEEDS} a/an ${field}`);
            }
        }
        
        if (errors.length) {
            return res.status(404).json({ message: errors });
        }
        
        next()   
    }
}