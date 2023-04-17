const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');  //done
const adminController = require('../controllers/adminController');  //Done


router.post('/signup',controller.signUp);
router.post('/signIn',controller.signIn);
router.post('/adminSignUp',adminController.adminSignUp)
router.post('/adminSignIn',adminController.adminSignIn)

module.exports = router;