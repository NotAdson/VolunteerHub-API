import { PostService } from "../services/Post.service.js"
import { ERROS } from "../shared/messages.js"

const instancePostService = new PostService()

export async function createPost(req, res){
    try{
        const {title, content} = req.body
        const userId = req.userId
        const { statusValue, message} = await instancePostService.createPost(title, content, userId)
        return res.status(statusValue).json({message: message})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL} while creating post`})
    }

}

export async function getPost(req, res){
    try{
        const {id} = req.body
        const response = await instancePostService.getPost(id)
        return res.status(response.statusValue).json({response})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL} while getting post`})
    }
}

export async function getAllPostsFromUser(req, res){
    try{
        const {userId} = req.params
        const response = await instancePostService.getAllPostsFromUser(userId)
        return res.status(response.statusValue).json({response})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL} while getting all posts from a specific user`})
    }
}

export async function getAllPosts(req, res){
    try{
        const response = await instancePostService.getAllPosts();
        return res.status(response.statusValue).json({
            response
        })        
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL} while getting all posts`})
    }
}

export async function updateTitle(req, res){
    try{
        const { newTitle, postId } = req.body
        const userId = req.userId
        const response = await instancePostService.updateTitle(userId, postId, newTitle)
        return res.status(response.statusValue).json({response})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL} while updating title`})
    }
}

export async function updateContent(req, res){
    try{
        const { newContent, postId } = req.body
        const userId = req.userId
        const response = await instancePostService.updateContent(userId, postId, newContent)
        return res.status(response.statusValue).json({response})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL} while updating content`})
    }
}

export async function deletePost(req, res){
    try{
        const { postId, password} = req.body
        const userId = req.userId
        const response = await instancePostService.deletePost(userId, postId, password)
        
        return res.status(response.statusValue).json({response})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({message: `${ERROS.INTERNAL} while deleting post`})
    }
}