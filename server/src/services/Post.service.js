import { database } from "../database/connection.js"
import { PostModel } from "../models/Post.model.js"
import { UserModel } from "../models/User.model.js"
import { SUCCESS, ERROS } from "../shared/messages.js"

export class PostService{
    async createPost(title, content, creatorId){
        try{
            await database.sync()
            const newPost = await PostModel.create({title, content, creatorId})
            return {
                statusValue:201,
                message: `Created ${SUCCESS.POST}`,
                postId: newPost.id
            }
        }catch(error){
            return{
                statusValue: 404,
                message: error.message
            }
        }
    }

    async getPost(id){
        try{
            await database.sync()
            const post = await PostModel.findByPk(id)
            return {
                statusValue: 200,
                post: post,
                message: `Returned ${SUCCESS.POST}`
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }

    async getAllPostsFromUser(userId){
        try{
            await database.sync()
            const posts = await PostModel.findAll({
                where: {
                    creatorId: userId
                },
                order: [
                    ["createdAt", "DESC"],
                ]
            })

            return {
                statusValue: 200,
                content: posts,
                message: posts.length ?`Got ${SUCCESS.POST}` : `The user doesn't have any posts or it doesn't exist.`
            }

        }catch(error){
            console.log(error.message)
            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while getting posts from user.`
            }
        }
    }

    async getAllPosts(){
        try{
            await database.sync()
            const posts = await PostModel.findAll({})
            return {
                statusValue: 200,
                posts: posts
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }


    async updateTitle(userId, postId, newTitle){
        try{
            const user = await UserModel.findByPk(userId)
            const post = await PostModel.findByPk(postId)

            if(!user) return {statusValue: 404, message:`The user doesn't exist`}
            if(!post) return {statusValue: 404, message:`The post doesn't exist.`}
            if(user.id !== post.creatorId) return {statusValue: 404, message:`Only the creator can change the title!`}

            post.update({title:newTitle})
            return {
                statusValue: 200,
                message: `Title ${SUCCESS.UPDATED}`
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }

    async updateContent(userId, postId, newContent){
        try{
            const user = await UserModel.findByPk(userId)
            const post = await PostModel.findByPk(postId)

            if(!user) return {statusValue: 404, message:`The user doesn't exist.`}
            if(!post) return {statusValue: 404, message:`The post doesn't exist.`}
            if(user.id !== post.creatorId) return {statusValue: 404, message: "Only the creator can update the content."}

            post.update({content: newContent})
            return {
                statusValue: 200,
                message: `Content ${SUCCESS.UPDATED}`
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }

    async deletePost(userId, postId, password){
        try{
            const user = await UserModel.findByPk(userId)
            const post = await PostModel.findByPk(postId)

            if(!user) return {statusValue: 404, message:`The user doesn't exist.`}
            if(!post) return {statusValue: 404, message:`The post doesn't exist.`}
            if(user.id !== post.creatorId) return {statusValue: 404, message: `Only the creator can delete the post.`}
            if(user.password !== password) return {statusValue: 404, message:`${ERROS.WRONG_PASSWORD}`}

            post.destroy()
            return {
                statusValue: 200,
                message: `Post ${SUCCESS.DELETED}`
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }
}