const blacklistedModel = require('../models/blacklisted.model');
const captainModel = require('../models/captain.model')
const {z} = require('zod')


const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  vehicle: z.object({
    color: z.string().min(3, "Color of vehicle is required"),
    plate: z.string().min(5, "Vehicle plate number is required"),
    capacity: z.number().min(1, "At least have capacity of one guest"),
    vehicleType: z.enum(['car', 'motorcycle', 'auto'])
  })
});


const registerCaptain = async (req, res, next) => {
  try {
   
    const validatedCaptain = registerSchema.parse(req.body);
    const { firstName, lastName, password, email, vehicle } = validatedCaptain;

   
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(409).json({ message: "Captain already registered" });
    }

    
    const hashedPassword = await captainModel.hashPassword(password);

  
    const newCaptain = await captainModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
      }
    });

   
    const token = await newCaptain.generateAuthToken();

    
    res.status(201).json({
      message: "Captain created successfully",
      data: newCaptain,
      token
    });

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json({ message: error.message || "Error creating captain" });
  }
};


const loginCaptainschema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters")
})

const loginCaptain = async(req,res,next) => {
  const validatedCapDetails = loginCaptainschema.parse(req.body);
  const {email,password} = validatedCapDetails;
  
  try {
    const capInfo = await captainModel.findOne({email}).select('+password')
    
    const checkPassword  = await capInfo.comparePassword(password);

    if(!checkPassword){
      throw new Error("Password is wrong")
    }
   
   const token  = await capInfo.generateAuthToken();
  
   

   const options = {
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
  }

  return res.status(200).setHeader("auth-token",token)
                        .cookie("token",token,options)
                        .json({
                            message:"Captain Login Successfully"
                             })
  
  } catch (error) {
    res.status(401).json({
      message:"Failed to login captain",
      Error:error.message
    })
  }
  

}

const getCaptainProfile = async(req,res,next) => {
  res.status(200).json(
    {
      captain:req.user
    }
  )
}

const logoutCaptain = async(req,res,next) => {
 
  const token = req.headers["auth-token"] || req.cookies.token;
  const blacklistedToken = await blacklistedModel.create({
    token
  })

   const options = {
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
  }

  res.clearCookie("token",options)
     .json({
      message:"User logout successfully"
     })
 
}

module.exports = {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain
}