const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const  blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req,res,next)=>{
//This is used to check the validation of the request that we configured in the route 
//ye routes se request ke vaha ke valdation check me koi error to nh aaya agar ko mai request kur raha hu bej do muje
     const errors = validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
     }
//When Everything is okay then we will get the data from the request
     const {fullname,email,password} = req.body;

//Now check koi user already exist or not
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }
    //now user not exits then start the creating process then 
/* 
1. Hash the password because we don't want to store the password in plain text
2. Create the user
3. Generate the auth token
4. Return the response
*/
     const hashedPassword = await userModel.hashPassword(password);
//Jub passwrod hash kur deya to  to user ko create karege but remember 
//jo user service hai user createUser function ko call kurke user create kur sakte hai mean register karava sakte hai
     const  user = await userService.createUser(
          {firstname:fullname.firstname, //Yaha pe fullname object me aarraha hai jsime fullname and last name hai
          lastname:fullname.lastname,
          email,
          password:hashedPassword});

     //Now we will generate the auth token
     const token = user.generateAuthToken();
     res.status(201).json({token,user});

}

module.exports.loginUser = async (req,res,next)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
     }

     const {email,password} = req.body;
     const user = await userModel.findOne({email}).select('+password');
 
     if(!user){
          console.log('user not found');
          return res.status(401).json({message:'Invalid email or password'});
     }

     
     const isMatch = await user.comparePassword(password);
    if(!isMatch){
     console.log('password not match');
         return res.status(401).json({message:'Invalid email or password'});
    }

    //then user ke leye token generate kur legege
    const token = user.generateAuthToken();

    res.cookie('token',token);
    res.status(200).json({token,user});

}

module.exports.getUserProfile = async (req,res,next)=>{
     res.status(200).json(req.user);
}

module.exports.logoutUser = async (req,res,next)=>{
     res.clearCookie('token');
     const token = req.cookies.token || req.headers.authorization.split(' ')[1];
     await blackListTokenModel.create({token});
     res.status(200).json({message:'Logged out'});
}