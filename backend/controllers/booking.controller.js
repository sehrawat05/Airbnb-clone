import { Booking } from "../models/booking.model.js";
import {Listing} from "../models/listing.model.js";
import{User} from "../models/user.model.js";
export const createBooking=async(req,res)=>{
    try{
        let {id}=req.params;
        let{checkIn,checkOut,totalRent}=req.body;
        let listing=await Listing.findById(id);
        if(!listing){
            return res.status(404).json({message:"Listing not found"});
        }
        if(new Date(checkIn)>=new Date(checkOut)){
            return res.status(400).json({message:"Check in date must be before check out date"});
        }
        if(listing.isBooked){
            return res.status(400).json({message:"Listing is already booked"});
        }
        let booking=await Booking.create({
            checkIn,
            checkOut,
            totalRent,
            host:listing.host,
            guest:req.userId,
            listing:listing._id
        })
        let user=await User.findByIdAndUpdate(req.userId,{
            $push:{bookings:listing}
        },{new:true});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        listing.guest=req.userId;
        listing.isBooked=true;
        await listing.save();
        return res.status(201).json({message:"Booking created successfully",booking});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}