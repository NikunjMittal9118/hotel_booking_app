import express from 'express'
import User from '../models/user.js'
import { deleteMe, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verify.js';
const router = express.Router();

//Read
router.get('/:id', verifyUser, getUser)

//Read All
router.get('/', verifyAdmin, getAllUsers)

//Update
router.put('/:id', verifyUser, updateUser)

//DeleteMe
router.delete('/:id',verifyUser, deleteMe)

//DeleteAnyAccount 
router.delete('/:id',verifyAdmin, deleteUser)


export default router