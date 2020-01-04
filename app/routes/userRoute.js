//Define Dependences
const express = require('express')
const router = express.Router()
//Import controller and validation
const userController = require('../controllers/userController');
const upload = require("../config/upload");
//Content
// Note: locahost:6969/user/
router.post('/register' ,userController.register);
router.post('/login', userController.login);
router.post('/avatar/:id',userController.avatar);




//Export module
module.exports = router;