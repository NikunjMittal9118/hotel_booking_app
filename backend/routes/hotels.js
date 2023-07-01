import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, read, readAll, updateHotel } from '../controllers/hotelController.js';
import { verifyAdmin } from '../utils/verify.js';
const router = express.Router();

//Create 
router.post('/', verifyAdmin , createHotel)

//Read
router.get('/find/:id',read)

//Read All

router.get('/',readAll)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)


//Update
router.put('/:id', verifyAdmin, updateHotel)

//Delete
router.delete('/:id', verifyAdmin, deleteHotel)

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

{
    "name" : "Hotel Karakuri Circus",
    "type" : "Entertainment and Food",
    "city" : "Japan",
    "address" : "Shanghai",
    "distance" : "3500Km",
    "description" : "Best hotel for Entertainment and every type of Food available",
    "ratings" : "5",
    "cheapestPrice" : "4999",
    "featured" : "True"
}

*/