import { uploadOnCloudinary } from "../config/cloudinary.js";
import {User} from "../models/user.model.js";
import {Listing} from "../models/listing.model.js";   
export const addListing=async(req,res)=>{
    try{
        let host=req.userId;
        let {title,description,rent,city,landmark,category}=req.body;
        let image1=await uploadOnCloudinary(req.files.image1[0].path);
        let image2=await uploadOnCloudinary(req.files.image2[0].path);
        let image3=await uploadOnCloudinary(req.files.image3[0].path);
        
        let listing=await Listing.create({
            host,title,description,rent,city,landmark,category,image1,image2,image3
        })

        
        let user=await User.findByIdAndUpdate(host,{
            $push:{listings:listing._id}
        },{new:true});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(201).json({
            listing
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getListing=async(req,res)=>{
    try{
        let listing= await Listing.find().sort({createdAt:-1});
        res.status(200).json({
            success:true,
            listing
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}