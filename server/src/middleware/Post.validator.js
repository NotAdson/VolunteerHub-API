import { ERROS } from "../shared/messages.js";

export class PostValidator{
    async createPostValidation(req, res, next){
        const { title, content } = req.body || {}
        const userId = req.userId
        const fields = ["title", "content"]
        const errors = []

        if(!userId){
            errors.push(`The field userId cannot be blank.`)
        }
        for (const field of fields) {
            if (!req.body[field]) {
                errors.push(`${ERROS.USER_NEEDS} a/an ${field}`);
            }
        }
        
        if (errors.length) {
            return res.status(404).json({ message: errors });
        }
        
        next()
    }

    async getPostValidation(req, res, next){
        const { id } = req.body || {}
        const fields = ["id"]
        const erros = []

        for(const field of fields){
            if(!req.body[field]){
                erros.push(`${ERROS.POST_NEEDS} a/an ${field}`)
            }
        }

        if(erros.length){
            return res.status(404).json({message: erros})
        }

        next()
    }

    async updateTitleValidation(req, res, next){
        const { newTitle, postId, password } = req.body || {}
        const userId = req.userId
        const fields = ["newTitle", "postId", "password"]
        const erros = []

        if(!userId){
            erros.push(`The field userId cannot be blank.`)
        }
        for(const field of fields){
            if(!req.body[field]){
                erros.push(`${ERROS.POST_NEEDS} a/an ${field}`)
            }
        }

        if(erros.length){
            return res.status(404).json({message: erros})
        }

        next()
    }

    async updateContentValidation(req, res, next){
        const { newContent, postId, password } = req.body || {}
        const userId = req.userId
        const fields = ["newContent", "postId", "password"]
        const erros = []
        
        if(!userId){
            erros.push(`The field userId cannot be blank.`)
        }
        for(const field of fields){
            if(!req.body[field]){
                erros.push(`${ERROS.POST_NEEDS} a/an ${field}`)
            }
        }

        if(erros.length){
            return res.status(404).json({message: erros})
        }

        next()
    }

    async deletePostValidation(req, res, next){
        const { postId, password } = req.body || {}
        const userId = req.userId
        const fields = ["postId", "password"]
        const erros = []

        if(!userId){
            erros.push(`The field userId cannot be blank.`)
        }
        for(const field of fields){
            if(!req.body[field]){
                erros.push(`${ERROS.POST_NEEDS} a/an ${field}`)
            }
        }

        if(erros.length){
            return res.status(404).json({message: erros})
        }

        next()
    }
}