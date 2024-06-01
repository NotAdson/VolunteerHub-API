import { ERROS } from "../shared/messages.js";

export class UserValidator{
    async createUserValidation(req, res, next) {
        try{
            const { username, email, password } = req.body || {};
            const fields = ["username", "email", "password"];
            const errors = [];
        
            for (const field of fields) {
                if (!req.body[field]) {
                    errors.push(`${ERROS.USER_NEEDS} a/an ${field}`);
                }
            }
        
            if (errors.length) {
            return res.status(400).json({ errors });
            }
        
            next();

        }catch(error){
            console.log(error.message)

            return res.status(500).json({
                message: `${ERROS.INTERNAL} while validating request.`
            })
        }

    }

    async getUserValidation(req, res, next){
        try{
            const { id } = req.body;
            const errors = [];

            if(!id){
                errors.push(`${ERROS.USER_NEEDS}n id`);
            }

            if(errors.length){
                return res.status(400).json({errors});
            }

            next();
        }catch(error){
            console.log(error.message)

            return res.status(500).json({
                message: `${ERROS.INTERNAL} while validating request.`
            })
        }

    }

    async updatePasswordValidation(req, res, next){
        try{
            const { password, newPassword } = req.body;
            const userId = req.userId
            const fields = ["password", "newPassword"];
            const errors = [];

            if(!userId){
                errors.push(`The field userId cannot be blank.`)
            }
            for(const field of fields){
                if(!req.body[field]){
                    errors.push(`The field ${field} cannot be blank.`);
                }
            }

            if(errors.length){
                return res.status(400).json({errors});
            }

            next()
        }catch(error){
            console.log(error.message)

            return res.status(500).json({
                message: `${ERROS.INTERNAL} while validating request.`
            })
        }

    }

    async updateUsernameValidation(req, res, next){
        try{
            const { password, newUsername } = req.body;
            const userId = req.userId
            const fields = ["password", "newUsername"];
            const errors = [];

            if(!userId){
                errors.push(`The userId cannot be blank.`)
            }
            for(const field of fields){
                if(!req.body[field]){
                    errors.push(`The field ${field} cannot be blank.`)
                }
            }

            if(errors.length){
                return res.status(400).json({errors});
            }

            next()

        }catch(error){
            console.log(error.message)

            return res.status(500).json({
                message: `${ERROS.INTERNAL} while validating request.`
            })
        }

    }

    async updateProfilePictureValidation(req, res, next){
        try{
            const { url } = req.body;
            const userId = req.userId
            const errors = []

            if(!userId){
                errors.push(`The userId cannot be blank.`)
            }

            if(!url){
                errors.push(`The field url cannot be blank.`)
            }

            if(errors.length){
                return res.status(400).json({errors});
            }

            next()

        }catch(error){
            console.log(error.message)

            return res.status(500).json({
                message: `${ERROS.INTERNAL} while validating request.`
            })
        }

    }

    async updateDescriptionValidation(req, res, next){
        try{
            const { description } = req.body;
            const userId = req.userId
            const errors = []

            if(!userId){
                errors.push(`The userId cannot be blank.`)
            }

            if(!description){
                errors.push(`The field description cannot be blank.`)
            }

            if(errors.length){
                return res.status(400).json({errors});
            }

            next()

        }catch(error){
            console.log(error.message)

            return res.status(500).json({
                message: `${ERROS.INTERNAL} while validating request.`
            })
        }

    }

    async updateCVValidation(req, res, next){
        try{
            const { url } = req.body;
            const userId = req.userId
            const errors = []

            if(!userId){
                errors.push(`The userId cannot be blank.`)
            }

            if(!url){
                errors.push(`The field url cannot be blank.`)
            }

            if(errors.length){
                return res.status(400).json({errors});
            }

            next()

        }catch(error){
            console.log(error.message)

            return res.status(500).json({
                message: `${ERROS.INTERNAL} while validating request.`
            })
        }

    }

    async deleteUserValidation(req, res, next){
        try{
            const {password} = req.body
            const userId = req.userId
            const errors = [];
            if(!userId){
                errors.push(`The userId cannot be blank.`);
            }
            if(!password){
                errors.push(`The password cannot be blank.`)
            }
            if(errors.length){
                return res.status(400).json({errors});
            }

            next()

        }catch(error){
            console.log(error.message)

            return res.status(500).json({
                message: `${ERROS.INTERNAL} while validating request.`
            })
        }
    }
}