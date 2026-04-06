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
            $push:{listing:listing._id}
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
export const findListing=async(req,res)=>{
    try{
        let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing){
            res.status(404).json({message:"Listing not found"});
return;
        }
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
export const updateListing=async(req,res)=>{
    try{
        let {id}=req.params;
        let {title,description,rent,city,landmark,category}=req.body;
        let image1, image2, image3;
        
        if (req.files && req.files.image1 && req.files.image1[0]) {
            image1=await uploadOnCloudinary(req.files.image1[0].path);
        }
        if (req.files && req.files.image2 && req.files.image2[0]) {
            image2=await uploadOnCloudinary(req.files.image2[0].path);
        }
        if (req.files && req.files.image3 && req.files.image3[0]) {
            image3=await uploadOnCloudinary(req.files.image3[0].path);
        }
        let updateData = {
            title,
            description,
            rent,
            city,
            landmark,
            category
        };
        if (image1) updateData.image1 = image1;
        if (image2) updateData.image2 = image2;
        if (image3) updateData.image3 = image3;
        
        let listing=await Listing.findByIdAndUpdate(id, updateData, {new:true});
        
        res.status(201).json({
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
export const deleteListing=async(req,res)=>{
    try{
        let {id}=req.params;
        let listing=await Listing.findByIdAndDelete(id);
        let user=await User.findByIdAndUpdate(listing.host, {$pull: {listing: id}}, {new:true});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
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