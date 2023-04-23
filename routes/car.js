const  express = require('express')

const  router = express.Router()
const  controller = require('../controllers/car')
const passport = require('passport')
//localhost:5000/api/auth/login
router.get('/cars', controller.getAll())
router.get('/cars:id', controller.getById())
router.post('/cars',controller.addCar())
router.delete('/cars',controller.deleteCarById())
module.exports = router