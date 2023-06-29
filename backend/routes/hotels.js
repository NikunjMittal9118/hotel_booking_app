import express from 'express'
import { createHotel, deleteHotel, read, readAll, updateHotel } from '../controllers/hotelController.js';
const router = express.Router();

//Create 
router.post('/',createHotel)

//Read
router.get('/:id',read)

//Get All
router.get('/',readAll)

//Update
router.put('/:id',updateHotel)

//Delete
router.delete('/:id',deleteHotel)

export default router



/*

{
    "name" : "Hotel Jains",
    "type" : "Food",
    "city" : "Mumbai",
    "address" : "Goregaoun",
    "distance" : "50Km",
    "description" : "Only jain food availiable",
    "ratings" : "3.5",
    "cheapestPrice" : "1900",
    "featured" : "false"
}

*/