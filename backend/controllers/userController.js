import User from "../models/user.js"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, ...YourData} = user._doc
        res.status(200).json({YourData})
    }
    catch(err){
        next(err)
    }
}

export const getAllUsers = async (req,res,next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users) 
    }
    catch(err){
        next(err)
    }
}

export const updateUser = async (req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set: req.body})
        res.status(200).json(updatedUser)
    }
    catch(err){
        next(err)
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("User has been deletd!")
    }
    catch(err){
        next(err)
    }
}

export const deleteMe = (req, res, next)=>{
    try{
        const token = req.cookies.access_token
        jwt.verify(token, process.env.JWT_SEC_KEY, async (err,decoded)=>{
            if(err){
                return next(createError(404,"Something went wrong, try again!"))
            }
            else{
                await User.findByIdAndDelete(decoded.id)
                res.status(200).send("You successfully deleted your account")
            }
        })
    }
    catch(err){
        next(err)
    }
}

