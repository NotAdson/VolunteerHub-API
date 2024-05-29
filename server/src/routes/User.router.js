import { Router } from "express"
import { createUser, getUser, updateUsername, updateUsersPassword, deleteUser, logInUser } from "../controllers/User.controller.js"
import { UserValidator } from "../middleware/User.validator.js"
import { verifyJWT } from "../authentication/Authenticator.js"

const routerUser = Router()
const instanceUserValidator = new UserValidator()

routerUser.post("/register-user", instanceUserValidator.createUserValidation, async (req, res) =>{
    return await createUser(req, res)
})

routerUser.post("/login", async (req, res) => {
    return await logInUser(req, res)
})

routerUser.get("/user/get", instanceUserValidator.getUserValidation, async (req, res) => {
    return await getUser(req, res)
})

routerUser.put("/user/update-username", verifyJWT, instanceUserValidator.updateUsernameValidation, async (req, res) => {
    return await updateUsername(req, res)
})

routerUser.put("/user/update-password", verifyJWT, instanceUserValidator.updatePasswordValidation,async (req, res) => {
    return await updateUsersPassword(req, res)
})

routerUser.delete("/user/delete-account", verifyJWT, instanceUserValidator.deleteUserValidation,async (req, res) => {
    return await deleteUser(req, res)
})

export {routerUser}