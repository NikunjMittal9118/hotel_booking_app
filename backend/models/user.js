import mongoose from 'mongoose'
const {Schema} = mongoose

const userSchema = new mongoose.Schema({
    userName : {type : String, required : true, unique : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    isAdmin : {type : Boolean, default : false}
})

export default mongoose.model('userName',userSchema)