import express from 'express'
import User from '../models/user.js'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verify.js';
const router = express.Router();

//Read
router.get('/:id', verifyUser, getUser)

//Read All
router.get('/', verifyAdmin, getAllUsers)

//Update
router.put('/:id', verifyUser, updateUser)

//Delete
router.delete('/:id',verifyUser, deleteUser)


export default router