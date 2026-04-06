import { generateToken } from "../config/token.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp=async(req,res)=>{
try{
    let{name,email,password}=req.body;
    let existUser=await User.findOne({email});
    if(existUser){
        return res.status(400).json({message:"User already exists"});
    }

    let hashPassword=await bcrypt.hash(password,10);
    let user= await User.create({name:name,email:email,password:hashPassword});
    let token=await generateToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({message:"User created successfully", user});

}catch(error){
    return res.status(500).json({message:error.message});
}
}

export const login=async(req,res)=>{
    try{
    let{email,password}=req.body;
    let user=await User.findOne({email}).populate("listing", "title image1 image2 image3 description rent category city landmark");
    if(!user){
        return res.status(400).json({message:"Email doesn't exist. Register first"});
    }
    let isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message :"Incorrect password"})
    }
    let token=await generateToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json(user);
    

}catch(error){
    return res.status(500).json({message:error.message});
}
}
export const logout = async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message:"Logout successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}