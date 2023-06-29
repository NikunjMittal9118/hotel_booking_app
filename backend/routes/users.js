import express from 'express'
import User from '../models/user.js'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verify.js';
const router = express.Router();

//Verify user
router.get('/checkAuthenitication', verifyToken, (req,res)=>{
    res.send("Welcome User, You are Successfully verified!")
})

//Read
router.get('/:id',getUser)

//Get All
router.get('/',getAllUsers)

//Update
router.put('/:id',updateUser)

//Delete
router.delete('/:id',deleteUser)


export default router