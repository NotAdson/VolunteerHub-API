import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export function generateAccessToken(userId){
    try{
        return jwt.sign({ userId: userId }, process.env.TOKEN, {expiresIn: '1h'})
    }catch(error){
        console.log("Error trying to generate access token.")
        return null
    }
}

export function verifyJWT(req, res, next){
    try{
        const token = req.headers['x-access-token']

        jwt.verify(token, process.env.TOKEN, (error, decoded) => {
            if(error) return res.status(401).json({
                error: error
            });

            req.userId = decoded.userId;
            next();
        }) 
    }catch(error){
        return res.status(401).json({
            message: "Error trying to verify JWT.",
            error: error.message
        })
    }
}