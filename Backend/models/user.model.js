const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
  fullname:{
     firstname:{
          type:String,
          required:true,
          minlength:[3,'Firstname must be at least 3 characters long'],

     },

     lastname:{
        type:String,
        required:true,
        minlength:[3,'Lastname must be at least 3 characters long'],
     },
},
      email:{
         type:String,
      required:true,
      unique:true,
      minlength:[3,'Email must be at least 3 characters long'],
 },
     password:{
          type:String,
          required:true,
          select:false,
     },
     socketId:{
          type:String,
     }

});
userSchema.methods.generateAuthToken = function () {
     const  token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
     return token;
}

userSchema.methods.comparePassword = async function (password) {
     const match = await bcrypt.compare(password,this.password);
     return match;
}
userSchema.statics.hashPassword = async function (password) {
     const hashedPassword = await bcrypt.hash(password,10);
     return hashedPassword;
}

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;

