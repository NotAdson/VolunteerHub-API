import { ERROS } from "../shared/messages.js";

export class PostValidator{
    async createPostValidation(req, res, next){
        try{
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
                return res.status(400).json({ message: errors });
            }
            
            next()            
        }catch(error){
            console.log(error.message)
            return res.status(500).json({message: `${ERROS.INTERNAL} while validating request`})
        }
    }

    async getPostValidation(req, res, next){
        try{
            const { id } = req.body || {}
            const fields = ["id"]
            const erros = []

            for(const field of fields){
                if(!req.body[field]){
                    erros.push(`${ERROS.POST_NEEDS} a/an ${field}`)
                }
            }

            if(erros.length){
                return res.status(400).json({message: erros})
            }

            next()
        }catch(error){
            console.log(error.message)
            return res.status(500).json({message: `${ERROS.INTERNAL} while validating request`})
        }
    }

    async getAllPostsFromUserValidation(req, res, next){
        try{
            const {userId} = req.body
            if(!userId){
                return res.status(400).json({message: `User id cannot be blank.`})
            }

            next()
        }catch(error){
            console.log(error.message)
            return res.status(500).json({message: `${ERROS.INTERNAL} while validating request`})
        }
    }

    async updateTitleValidation(req, res, next){
        try{
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
                return res.status(400).json({message: erros})
            }

            next()
        }catch(error){
            console.log(error.message)
            return res.status(500).json({message: `${ERROS.INTERNAL} while validating request`})
        }
    }

    async updateContentValidation(req, res, next){
        try{
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
                return res.status(400).json({message: erros})
            }

            next()
        }catch(error){
            console.log(error.message)
            return res.status(500).json({message: `${ERROS.INTERNAL} while validating request`})
        }

    }

    async deletePostValidation(req, res, next){
        try{
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
                return res.status(400).json({message: erros})
            }

            next()
        }catch(error){
            console.log(error.message)
            return res.status(500).json({message: `${ERROS.INTERNAL} while validating request`})
        }
    }
}