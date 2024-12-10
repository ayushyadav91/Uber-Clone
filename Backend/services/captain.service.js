const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
      firstname, lastname, email, password, color, plate, capacity, vehicleType
})=>{
     if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType){
          throw new Error('Missing required fields');
     }
     const captain = captainModel.create({
          fullname:{
               firstname,
               lastname,
          },
          email,
          password,
          vechicle:{
               color,
               plate,
               capacity,
               vehicleType,
          },
    
     });
     return  captain;
};
