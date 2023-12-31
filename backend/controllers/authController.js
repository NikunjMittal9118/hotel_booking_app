import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"
import dotenv from 'dotenv'
dotenv.config()

export const register = async(req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)

        const userNew = new User({
            userName : req.body.userName,
            email : req.body.email,
            password : hash,
            isAdmin : req.body.isAdmin
        })
        await userNew.save()
        res.status(200).json({
            message : "Registration Successful",
            user : userNew
        })
    }
    catch(err){
        next(err)
    }
}

export const login = async(req,res,next)=>{
    try{
        const user = await User.findOne({
            userName : req.body.userName
        })
        if(!user){
            return next(createError(404,"User not found!"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect){
            return next(createError(400,"Wrong password"))
        }
        const token = jwt.sign({
            id : user._id,
            Admin : user.isAdmin
        }, process.env.JWT_SEC_KEY)
        console.log(user._id,user.isAdmin)
        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {httpOnly : true}).status(200).json({ details: { ...otherDetails }, isAdmin })
    }
    catch(err){
        next(err)
    }
}