const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const verifyJwt = async  (req,res,nect) => {
    const token = req.Headers.token;

  try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      
      const user = await User.findById(decoded?._id).select("-password");
      if(!user){
          throw new Error("Unauthorized accesss");
      }
      req.user = user;
      next();
  } catch (error) {
    throw new Error(error)
  }

}

module.exports = verifyJwt;