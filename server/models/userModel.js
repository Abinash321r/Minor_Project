const mongoose = require('mongoose');

//schema
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAuthenticated:{
        type:Boolean,
        default:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})
const cropSchema =mongoose.Schema({
  crop: String,
  optimalTemperature: {
    min: Number,
    max: Number
  },
  optimalHumidity: {
    min: Number,
    max: Number
  },
  optimalSoilMoisture: {
    min: Number,
    max: Number
  }
});


// Create Models
const User = mongoose.model('User', userSchema);
const Crop = mongoose.model('Crop', cropSchema);

// Export Models
module.exports = {
  User,
  Crop
};
