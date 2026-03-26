import jwt from "jsonwebtoken";
const isAuth = (req, res, next) => {
    try{
        let {token} =req.cookies;
        if(!token)res.status(400).json({message:"Token not found"});
        let verifyToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!verifyToken)res.status(400).json({message:"Invalid token"});
        req.userId= verifyToken.userId;
        next();
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
};

export default isAuth;