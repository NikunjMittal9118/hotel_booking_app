import mongoose from 'mongoose'
const {Schema} = mongoose

const hotelSchema = new mongoose.Schema({
    name : {type : String, required : true},
    type : {type : String, required : true},
    city : {type : String, required : true},
    address : {type : String, required : true},
    distance : {type : String, min:0, required : true},
    images : {type : [String]},
    description : {type : String, required : true},
    ratings : {type : Number, min:0, max:5},
    rooms : {type : [String]},
    cheapestPrice : {type : Number, required : true},
    featured : {type : Boolean, default : false}
})

export default mongoose.model('hotelName',hotelSchema)
                                                    