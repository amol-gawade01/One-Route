const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const blacklistedModel = require("../models/blacklisted.model");
const captainModel = require("../models/captain.model");

const verifyJwt = async  (req,res,next) => {
  const token = req.headers["auth-token"] || req.cookies.token;
   console.log(req.headers["auth-token"] )
  const isBlacklistToken = await blacklistedModel.findOne({token})
  
  if(isBlacklistToken){
    return res.status(401).json({message:"Unauthorized acess"})
  }
  


  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded?._id); 
    console.log('user',user)
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};


const verifyJwtCap = async  (req,res,next) => {
  const token = req.headers["auth-token"] || req.cookies.token;
   
  const isBlacklistToken = await blacklistedModel.findOne({token})
  
  if(isBlacklistToken){
    return res.status(401).json({message:"Unauthorized acess"})
  }
  


  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await captainModel.findById(decoded?._id); 
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = {
  verifyJwt,
  verifyJwtCap
};