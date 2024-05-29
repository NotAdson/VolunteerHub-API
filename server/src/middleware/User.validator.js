import { ERROS } from "../shared/messages.js";

export class UserValidator{
    async createUserValidation(req, res, next) {
        const { username, email, password } = req.body || {};
        const fields = ["username", "email", "password"];
        const errors = [];
      
        for (const field of fields) {
          if (!req.body[field]) {
            errors.push(`${ERROS.USER_NEEDS} a/an ${field}`);
          }
        }
      
        if (errors.length) {
          return res.status(404).json({ errors });
        }
      
        next();
    }

    async getUserValidation(req, res, next){
        const { id } = req.body;
        const errors = [];

        if(!id){
            errors.push(`${ERROS.USER_NEEDS}n id`);
        }

        if(errors.length){
            return res.status(404).json({errors});
        }

        next();
    }

    async updatePasswordValidation(req, res, next){
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
            return res.status(404).json({errors});
        }

        next()
    }

    async updateUsernameValidation(req, res, next){
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
            return res.status(404).json({errors});
        }

        next()
    }

    async deleteUserValidation(req, res, next){
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
            return res.status(404).json({errors});
        }

        next()
    }
}