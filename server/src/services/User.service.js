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
            return {
                statusValue: 404,
                message: error.message
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
                return null
            }

            return user.id
        }catch(error){
            console.log(error.message)
            return null
        }
    }

    async getUser(id){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)
            return {
                statusValue:200,
                message: `Returned ${SUCCESS.USER}`,
                user: user
            }
        }catch(error){
            return {
                statusValue:404,
                message: error.message
            }
        }
    }

    async updatePassword(id, password, newPassword){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)
            if(user.password === password){
                user.update({password:newPassword})
                return {
                    statusValue: 200,
                    message: `Password ${SUCCESS.UPDATED}`
                }
            }
    
            return {
                statusValue: 404,
                message: ERROS.WRONG_PASSWORD
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }

    async updateUsername(id, password, newUsername){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)
            if(user.password === password){
                user.update({username: newUsername})
                return {
                    statusValue: 200,
                    message: `Username ${SUCCESS.UPDATED}`
                }
            }
    
            return {
                statusValue: 404,
                message: ERROS.WRONG_PASSWORD
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }

    async deleteUser(userId, password){
        try{
            await database.sync()
            const user = await UserModel.findByPk(userId)
            
            if(user.password !== password){
                return {
                    statusValue: 400,
                    message: `Wrong password!`
                }
            }

            user.destroy()
            return {
                statusValue: 200,
                message: `User ${SUCCESS.DELETED}`
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }

    }
}