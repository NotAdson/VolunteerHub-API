import { database } from "../database/connection.js"
import { CommentModel } from "../models/Comment.model.js"
import { UserModel } from "../models/User.model.js"
import { PostModel } from "../models/Post.model.js"
import { SUCCESS, ERROS } from "../shared/messages.js"

export class CommentService{
    async createComment(comment, creatorId, postId){
        try{
            await database.sync()
            const newComment = await CommentModel.create({comment, postId, creatorId})
            return {
                statusValue: 201,
                commentId: newComment.id,
                message: `Created ${SUCCESS.COMMENT}`
            }
        }catch(error){
            return {
                message: error.message,
                statusValue: 404
            }
        }
    }

    async getCommentsFromPost(postId){
        try{
            const comments = await CommentModel.findAll({
                where: {
                    postId: postId
                },
                order: [
                    ["createdAt", "DESC"], 
                ]
            })

            return {
                statusValue: 200,
                content: comments,
                message: `Got ${SUCCESS.COMMENT}`
            }
        }catch(error){
            return {
                message: error.message,
                statusValue: 404
            }
        }
    }

    async deleteComment(commentId, userId){
        try{
            await database.sync()
            const comment = await CommentModel.findByPk(commentId)
            const post = await PostModel.findByPk(comment.postId)
            const user = await UserModel.findByPk(userId)

            if(comment.creatorId!==user.id || post.creatorId !== user.id){return {statusValue: 404, message: "Only the creator of the comment or post can delete it!"}}

            await comment.destroy()

            return {
                statusValue: 200,
                message: `Deleted ${SUCCESS.COMMENT}`
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }
}