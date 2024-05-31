import { UserModel } from "../models/User.model.js"
import { database } from "../database/connection.js"
import { ERROS, SUCCESS } from "../shared/messages.js"

export class UserService{
    async createUser(username, email, password){
        try{
            await database.sync()
            const newUser = await UserModel.create({username, email, password})
            return {
                statusValue: 201,
                message: `Created ${SUCCESS.USER}`,
                userId: newUser.id
            }
        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while creating user.`
            }
        }
    }

    async userValidation(email, password){
        try{
            await database.sync()
            const user = await UserModel.findOne({
                where:{
                    email: email
                }
            })

            if(!user || user.password !== password){
                return {
                    statusValue: 401,
                    message: "The email or password is wrong!"
                }
            }

            return {
                statusValue: 200,
                userId: user.id
            }
        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while validating user.`
            }
        }
    }

    async getUser(id){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)

            if(!user){
                return {
                    statusValue: 404,
                    message: ERROS.USER_NOT_FOUND
                }
            }

            return {
                statusValue:200,
                message: `Returned ${SUCCESS.USER}`,
                user: {
                    id: user.id,
                    profile_picture: user.profile_picture_url,
                    username: user.username,
                    description: user.description,
                    cv: user.cv_url
                }
            }
        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while getting user.`
            }
        }
    }

    async updatePassword(id, password, newPassword){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)

            if(!user){
                return {
                    statusValue: 404,
                    message: ERROS.USER_NOT_FOUND
                }
            }

            if(user.password === password){
                user.update({password:newPassword})
                return {
                    statusValue: 200,
                    message: `Password ${SUCCESS.UPDATED}`
                }
            }
    
            return {
                statusValue: 401,
                message: ERROS.WRONG_PASSWORD
            }
        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while updating password.`
            }
        }
    }

    async updateUsername(id, password, newUsername){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)

            if(!user){
                return {
                    statusValue: 404,
                    message: ERROS.USER_NOT_FOUND
                }
            }

            if(user.password === password){
                user.update({username: newUsername})
                return {
                    statusValue: 200,
                    message: `Username ${SUCCESS.UPDATED}`
                }
            }
    
            return {
                statusValue: 401,
                message: ERROS.WRONG_PASSWORD
            }

        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while updating username.`
            }
        }
    }

    async updateProfilePicture(id, url){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)

            if(!user){
                return {
                    statusValue: 404,
                    message: `User ${ERROS.NOT_FOUND}.`
                }
            }

            user.profile_picture_url = url

            return {
                statusValue: 200,
                message: `Profile picture updated`
            }

        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while updating profile picture.`
            }
        }
    }

    async updateDescription(id, description){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)

            if(!user){
                return {
                    statusValue: 404,
                    message: `User ${ERROS.NOT_FOUND}.`
                }
            }

            user.description = description

            return {
                statusValue: 200,
                message: `Description updated`
            }

        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while updating description.`
            }
        }
    }

    async updateCV(id, url){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)

            if(!user){
                return {
                    statusValue: 404,
                    message: `User ${ERROS.NOT_FOUND}.`
                }
            }

            user.cv_url = url

            return {
                statusValue: 200,
                message: `CV updated`
            }

        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while updating profile picture.`
            }
        }
    }

    async deleteUser(userId, password){
        try{
            await database.sync()
            const user = await UserModel.findByPk(userId)

            if(!user){
                return {
                    statusValue: 404,
                    message: ERROS.USER_NOT_FOUND
                }
            }
            
            if(user.password !== password){
                return {
                    statusValue: 401,
                    message: ERROS.WRONG_PASSWORD
                }
            }

            user.destroy()
            return {
                statusValue: 200,
                message: `User ${SUCCESS.DELETED}`
            }
        }catch(error){
            console.log(error.message)

            return {
                statusValue: 500,
                message: `${ERROS.INTERNAL} while deleting user`
            }
        }

    }
}