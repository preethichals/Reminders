const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
require('../middleware/auth')

//Register User 

router.post('/register',userCtrl.registerUser)

//Login User 

router.post('/login',userCtrl.loginUser)

//Verify token 

router.get('/verify',userCtrl.verifiedToken)

module.exports = router