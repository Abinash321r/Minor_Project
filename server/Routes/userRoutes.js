const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userControllers.js');

router.get('/',async(req, res) => {res.send('welcome to server')})

router.get('/photo',async(req, res) => {res.send('welcome to server')})
router.post('/signup',userController.getUserData)
router.post('/login',userController.checkUserData)
router.post('/cropsdata',userController.getCropsData)

module.exports = router;