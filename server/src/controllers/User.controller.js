import { UserService } from "../services/User.service.js"
import { generateAccessToken } from "../authentication/Authenticator.js"
import { ERROS } from "../shared/messages.js"

const instanceUsersService = new UserService()

export async function createUser(req, res){
    try{
        const { username, email, password } = req.body
        const {statusValue, message, userId} = await instanceUsersService.createUser(username, email, password)

        if(statusValue === 201){
            const userToken = generateAccessToken(userId)

            return res.status(statusValue).json({
                message: message,
                token: userToken
            })
        }

        return res.status(statusValue).json({
            message: message
        })

    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to create the user.`
        })
    }
}

export async function getUser(req, res){
    try{
        const {id} = req.body
        const {statusValue, message, user} = await instanceUsersService.getUser(id)

        return res.status(statusValue).json({
            message: message,
            user: user
        })

    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to get the user.`
        })
    } 
}

export async function logInUser(req, res){
    try{
        const { email, password } = req.body

        const {statusValue, message, userId} = await instanceUsersService.userValidation(email, password);

        if(statusValue == 200){
            const token = generateAccessToken(userId)

            return res.status(statusValue).json({
                token: token
            })
        }

        return res.status(statusValue).json({
            message: message
        })

    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to log user in.`
        })
    }

}

export async function updateUsersPassword(req, res){
    try{
        const { password, newPassword} = req.body

        const userId = req.userId

        const {statusValue, message} = await instanceUsersService.updatePassword(userId, password, newPassword)

        return res.status(statusValue).json({message: message})

    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to update user's password.`
        })
    }

}

export async function updateUsername(req, res){
    try{
        const { password, newUsername} = req.body

        const userId = req.userId

        const {statusValue, message} = await instanceUsersService.updateUsername(userId, password, newUsername)

        return res.status(statusValue).json({message: message})
    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to update user's username.`
        })
    }

}

export async function updateProfilePicture(req, res){
    try{
        const { url } = req.body
        const userId = req.userId

        const {statusValue, message} = await instanceUsersService.updateProfilePicture(userId, url)

        return res.status(statusValue).json({message: message})

    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to update user's profile picture.`
        })
    }
}

export async function updateDescription(req, res){
    try{
        const { description } = req.body
        const userId = req.userId

        const {statusValue, message} = await instanceUsersService.updateDescription(userId, description)

        return res.status(statusValue).json({message: message})

    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to update user's description.`
        })
    }
}

export async function updateCV(req, res){
    try{
        const { url } = req.body
        const userId = req.userId

        const {statusValue, message} = await instanceUsersService.updateCV(userId, url)

        return res.status(statusValue).json({message: message})

    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to update user's profile picture.`
        })
    }
}

export async function deleteUser(req, res){
    try{
        const { password } = req.body

        const userId = req.userId

        const { statusValue, message} = await instanceUsersService.deleteUser(userId, password)

        return res.status(statusValue).json({message: message})

    }catch(error){
        console.log(error.message)

        return res.status(500).json({
            message: `${ERROS.INTERNAL} while trying to delete user.`
        })
    }

}