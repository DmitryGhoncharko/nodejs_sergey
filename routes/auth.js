const  express = require('express')

const  router = express.Router()
const  controller = require('../controllers/auth.js')
const passport = require('passport')
//localhost:5000/api/auth/login
router.post('/login',passport.authenticate('jwt',{session:false}), controller.login)
router.post('/register',controller.register)
module.exports = router