import mongoose, { Schema } from "mongoose";


export const BookingSchema = new mongoose.Schema({
    place:{type:Schema.Types.ObjectId , ref: "Places", required:true},
    user:{type:Schema.Types.ObjectId, ref: "Users", required:true},
    host:{type:Schema.Types.ObjectId, ref: "Users", required:true},
    checkin:{type:String , required:true},
    checkout:{type:String , required:true},
    guests:{type:String , required:true},
    Username:{type:String , required:true},
    Userphone:{type:String , required:true},
    fullprice:{type:String},
    halfprice:{type:String},
    worktrip:{type:Boolean},
},{timestamps:true})


export default mongoose.model("Booking" , BookingSchema);

