const userModel = require('../models/user.model');
const { z } = require("zod");

const blacklistedModel = require('../models/blacklisted.model');

  const signUpSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });


const SignUp = async (req, res, next) => {

  const validatedData = signUpSchema.parse(req.body);

  const { firstName, lastName, password, email } = validatedData;

  if ([firstName,password,email].some((field) => field?.trim() === "")) {
    throw new Error("All fields are require");
  }



  const userNameExist = await  userModel.findOne({
    $or:[{firstName},{email}]
  })

  if (userNameExist) {
    throw new Error("User already exist");
  }
try {
  
    const hashedPassword = await userModel.hashPassword(password)
  
    const userCreated = await userModel.create({
     
      firstName,
      lastName,
      password : hashedPassword,
      email,
    });
  
    const token = await  userCreated.generateAuthToken();
    
    
    console.log("User Created successfully");

    res.json({
    token,
    userData: userCreated,
  });
    
} catch (error) {
  res.json({
    message:"Error while creating user  "
  })
  
}
  
};

const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

const Login = async (req,res, next) => {

  const validatedData = LoginSchema.parse(req.body) 

  const { email,password} = validatedData;

  const user = await userModel.findOne({ email }).select('+password');

  if(!user){
    throw new Error("User not found ")
  }

  const checkedPasword = await user.comparePassword(password)

  if(!checkedPasword){
    throw new Error("Password is wrong")
  }

 
  const token = await user.generateAuthToken();

  const options = {
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
  }

 return res
           .setHeader("auth-token", token)
           .cookie("token",token,options)
           .json(
           {
             message:"User Login successfullly",
             user,
            token
           }
  )


  
};

const Logout = async (req,res,next) => {
   const token = req.headers["auth-token"] || req.cookies.token;
   const blacklistedToken = await blacklistedModel.create({
    token
   });
   
   const options = {
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
  }

  res.clearCookie("token",options)
    .json(
    {
      message:"User logout successfully"
    }
  )
}


const getUser = (req,res,next) => {
  res.status(200).json({
    data:req.user,
    message:"user fetch successfully"
  })
}

module.exports = {
   SignUp,
   Login,
   Logout,
   getUser

}