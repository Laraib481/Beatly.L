const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


async function registerUser(req,res) {

    const {username, email, password, role} = req.body;

    const  isUserAllreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAllreadyExist){
        return res.status(409).json({
            messege:"user allready exist"
        })
    }
    
    const hash = await bcryptjs.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        role
    
    })
    
    const token = jwt.sign({
        id: user._id,
        role: user.role,

    },process.env.JWT_SECRET,)

    res.status(201).json({
         messege: "useregister successfully",
         user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
         }

    })

}


async function loginUser(req,res) {

    const {username, email, password, role} = req.body;

    const  user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password");

    console.log(user);

    if(!user){
      return res.status(401).json({
            messege:"Invalid creadinalitie"
        })
    }
   

   const isPasswordValid = await bcryptjs.compare(password,user.password)
   if(!isPasswordValid){
     return res.status(401).json({
        messege:"Invalid creadinalities"
     })
   }

   const token = jwt.sign({
    id: user._id,
    role: user.role,
    
   },process.env.JWT_SECRET)

   res.cookie("token",token)

   res.status(200).json({
    messege: "User logged in successfully",
    token,
    user:{
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }
   })

   console.log("Body:", req.body);
}




module.exports = {registerUser,loginUser};
