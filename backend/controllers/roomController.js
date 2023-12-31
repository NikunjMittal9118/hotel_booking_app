import Room from "../models/room.js"
import Hotel from "../models/hotel.js"

export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId
    const roomNew = new Room(req.body)
    try{
        const savedRoom = await roomNew.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
        }
        catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }
    catch(err){
        next(err)
    }
}

export const read = async (req,res,next)=>{
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }
    catch(err){
        next(err)
    }
}

export const readAll = async (req,res,next)=>{
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms) 
    }
    catch(err){
        next(err)
    }
}

export const updateRoom = async (req,res,next)=>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set: req.body})
        res.status(200).json(updatedRoom)
    }
    catch(err){
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try{
        await Hotel.findByIdAndUpdate(hotelId, {$pull: { rooms: req.params.id }})
      } 
      catch(err){
        next(err);
      }
      res.status(200).json("Room has been deleted")
    } 
    catch(err){
      next(err)
    }
}