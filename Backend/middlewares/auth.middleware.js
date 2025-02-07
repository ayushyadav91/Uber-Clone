const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');



module.exports.authUser = async (req ,res, next)=>{ 
//take token from cookie or header 
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
     if(!token){
          return res.status(401).json({message:'Unauthorized'});
     }

     const blacklistToken = await userModel.findOne({token:token});
     if(blacklistToken){
          return res.status(401).json({message:'Unauthorized'});
     }

     try{
          //token ko verify kurlege apne jwt secret se then vo vahi data return karege jo
// sign ke time pe deya tha use data ko decode karege to id deya the hamne to id ko decode karege 
//then id ko lege aur find kur lege kon sa user tha (with the id of the user)
          const decoded = jwt.verify(token,process.env.JWT_SECRET);
          const user = await userModel.findById(decoded._id);

          console.log(user);
     //then user find karne ke bad user se user data ko lekge request me set kur dege
          req.user = user;
          return next(); //ja raha hu set karne
     
     }catch(err){
          return res.status(401).json({message:'Unauthorized'});
     }
}

module.exports.authCaptain = async (req ,res, next)=>{
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
     if(!token){
          return res.status(401).json({message:'Unauthorized'});
     }
     const blacklistToken = await blacklistTokenModel.findOne({token:token});
     if(blacklistToken){
          return res.status(401).json({message:'Unauthorized'});
     }
     try{
          const decoded = jwt.verify(token,process.env.JWT_SECRET);

          console.log(decoded); 
          const captain = await captainModel.findById(decoded._id);

          req.captain = captain;
          return next();
     
     }    catch(err){
          return res.status(401).json({message:'Unauthorized'});
     }
}
     



