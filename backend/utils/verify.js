import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req,res,next)=>{
    const token =  req.cookies.access_token
    if(!token){
        return next(createError(404,"Token not found!"))
    }
    jwt.verify(token,process.env.JWT_SEC_KEY,(err,decodedToken)=>{
        if(err){
            return next(createError(404,"Token is not valid!"))
        }
        req.user = decodedToken //defining new property in req object
        next()
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.id || req.user.Admin === true){
            next()
        }
        else{
            return next(createError(403,"You are not authenticated!"))
        }
    })
}

export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.Admin === true){
            next()
        }
        else{
            next(createError(401,"You are not the admin"))
        }
    })
}