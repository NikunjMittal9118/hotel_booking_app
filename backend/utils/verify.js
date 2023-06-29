import jwt from "jsonwebtoken"
import { createError } from "./error"

export const verifyToken = (req,res,next)=>{
    const token =  req.cookies.access_token
    if(!token){
        return next(createError(404,"Token not found!"))
    }
    jwt.verify(token,process.env.JWT_SEC_KEY,(err,user)=>{
        if(err){
            return next(createError(404,"Token is not valid!"))
        }
        req.user = user
        next()
    })
}