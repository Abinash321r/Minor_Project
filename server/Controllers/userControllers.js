//const mongoose = require('mongoose');
//const cropcollection = mongoose.connection.collection('cropdata');
const {User,Crop} = require('../models/userModel.js');

exports.getUserData = async(req, res) => {
    const {name,email,password} = req.body;
    const user={
        name:name,
        email:email,
        password:password
    }
    console.log('Received data:',user);
    try {
        const newUser = new User(user); // Create a new instance of the User model
        await newUser.save();
        console.log('User inserted:', user);
        res.json({ message: 'SignUp sucessfully', status: 'success' });
        }
       catch (error) {
        console.error('Error inserting users:', error);
        res.status(500).json({ success: false, message: 'Error inserting users' });
      }
    
}

exports.getCropsData = async(req, res) => {
  try {
    // Extract crop name from request body
    const { cropName } = req.body;
    console.log(cropName)

    // If no cropName is provided, return all crops
    if (!cropName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a crop name'
      });
    }

    // Find crops based on the name (case-insensitive search)
    const cropsData = await Crop.find({
      crop: { $regex: new RegExp(cropName, 'i') }
    });

    // Check if crops were found
    if (cropsData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No crops found with the given name'
      });
    }

    // Send the data as a JSON response
    res.status(200).json({
      success: true,
      data: cropsData
    });
  } catch (error) {
    console.error('Error fetching crops data:', error);

    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Failed to fetch crops data',
      error: error.message
    });
  }
}



exports.checkUserData = async(req, res) => {
    const {name,email,password} = req.body;
    console.log('Received data:',req);
    

    try {
        // Check if user exists by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if the name matches
        if (user.name !== name) {
          return res.status(400).json({ message: 'Name does not match' });
        }
    
        // Verify the password
        if (user.password !== password) {
            return res.status(400).json({ message: 'Name does not match' });
          }
        // Login successful
        res.status(200).json({ message: 'Login successful' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    

}