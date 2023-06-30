import express from 'express'
import Room from '../models/room.js'
import { createRoom, deleteRoom, read, readAll, updateRoom } from '../controllers/roomController.js';
const router = express.Router();

//Create 
router.post('/:hotelId', verifyAdmin , createRoom)

//Read
router.get('/:id',read)

//Read All
router.get('/',readAll)

//Update
router.put('/:id', verifyAdmin, updateRoom)

//Delete
router.delete('/:id', verifyAdmin, deleteRoom)



export default router