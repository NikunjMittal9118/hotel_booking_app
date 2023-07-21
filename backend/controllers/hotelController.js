import Hotel from "../models/hotel.js"

export const createHotel = async (req,res,next)=>{
    const hotelNew = new Hotel(req.body)
    try{
        const savedHotel = await hotelNew.save()
        res.status(200).json(savedHotel)
    }
    catch(err){
        next(err)
    }
}

export const read = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }
    catch(err){
        next(err)
    }
}
export const readAll = async (req,res,next)=>{
    var {min, max, ...others} = req.query
    if(min === undefined){
        min = 1
    }
    if(max === undefined){
        max = 10000000000
    }
    try{
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gt: min, $lt: max}
        })
        res.status(200).json(hotels)
    }
    catch(err){
        next(err)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
      const list = await Promise.all(
        cities.map((city) => {
          let k = Hotel.countDocuments({ city: city })
          let obj = [city,k]
          console.log(typeof k)
          return Hotel.countDocuments({ city: city })
        })
      )
      res.status(200).send(list)
    } 
    catch (err) {
      next(err)
    }
}
export const countByType = async (req,res,next)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const appartmentCount = await Hotel.countDocuments({type: "appartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})
        res.status(200).json(
            [
                {
                    type: "hotels",
                    count: hotelCount
                },
                {
                    type: "appartments",
                    count: appartmentCount
                },
                {
                    type: "resorts",
                    count: resortCount
                },
                {
                    type: "villas",
                    count: villaCount
                },
                {
                    type: "cabins",
                    count: cabinCount
                }
            ]
        ) 
    }
    catch(err){
        next(err)
    }
}


export const updateHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body})
        res.status(200).json(updatedHotel)
    }
    catch(err){
        next(err)
    }
}

export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send("Hotel has been deletd!")
    }
    catch(err){
        next(err)
    }
}