import { PostService } from "../services/Post.service.js"

const instancePostService = new PostService()

export async function createPost(req, res){
    const {title, content} = req.body
    const userId = req.userId
    const { statusValue, message} = await instancePostService.createPost(title, content, userId)
    return res.status(statusValue).json({message: message})
}

export async function getPost(req, res){
    try{
        const {id} = req.body
        const response = await instancePostService.getPost(id)
        return res.status(response.statusValue).json({response})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function getAllPosts(req, res){
    try{
        const response = await instancePostService.getAllPosts();
        return res.status(response.statusValue).json({
            response
        })        
    }catch(error){
        return res.status(404).json({error: error.message})
    }

}

export async function updateTitle(req, res){
    try{
        const { newTitle, postId } = req.body
        const userId = req.userId
        const response = await instancePostService.updateTitle(userId, postId, newTitle)
        return res.status(response.statusValue).json({response})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function updateContent(req, res){
    try{
        const { newContent, postId } = req.body
        const userId = req.userId
        const response = await instancePostService.updateContent(userId, postId, newContent)
        return res.status(response.statusValue).json({response})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function deletePost(req, res){
    try{
        const { postId, password} = req.body
        const userId = req.userId
        const response = await instancePostService.deletePost(userId, postId, password)
        
        return res.status(response.statusValue).json({response})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}