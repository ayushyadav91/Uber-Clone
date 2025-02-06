const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');

//This express validator is used to check the routes folder kii agar vaha pe koi bhi error array hai to 
//to phir vo yaha pe aayegga and check hojayega vo every function ke stating pe request me jake configure hojayega
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async (req,res,next)=>{
    //This is used to check the validation of the request that we configured in the route
//ye routes se request ke vaha ke valdation check me koi error to nh aaya agar ko mai request kur raha hu bej do muje
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(401).json({errors:errors.array()});
}

//When Everything is okay then we will get the data from the request
const {fullname,email,password,vehicle} = req.body;

//Now check koi captain already exist or not
const isCaptainAlreadyExist = await captainModel.findOne({email});
if(isCaptainAlreadyExist){
    return res.status(400).json({message:['Captain already exist']});
}

//now user not exits then start the creating process then 
/* 
1. Hash the password because we don't want to store the password in plain text
2. Create the captain
3. Generate the auth token
4. Return the response
*/
const hashedPassword = await captainModel.hashPassword(password);  
const captain = await captainService.createCaptain({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
});
const token = captain.generateAuthToken();
res.status(201).json({token,captain});
}
module.exports.loginCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const token = captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile = async (req,res,next)=>{
     res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain = async (req,res,next)=>{
     const token = req.cookies.token || req.headers.authorization.split(' ')[1];
     await blacklistTokenModel.create({token});

     res.clearCookie('token');

     res.status(200).json({message:'Logout successful'});
}
