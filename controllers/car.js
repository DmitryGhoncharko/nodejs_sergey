const Car = require('../models/Car')

module.exports.getAll = async  function(req,res){
    try{
        const cars = await Car.find()
        res.status(200).json({
            cars: cars
        })
    }catch (e){
        console.log(e)
        res.status(500).json({
            message: 'server was down'
        })
    }
}
module.exports.getById = async function(req,res){
    try{
        const car = await Car.findById({id: req.body.id})
        if(car){
            res.status(200).json({
                car: car
            })
        }else {
            res.status(404).json({
                message: "car not found"
            })
        }
    }catch (e){
        console.log(e)
        res.status(500).json({
            message: 'server was down'
        })
    }
}
module.exports.addCar = async function(req,res){
    try{
        const car = new Car({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost
        })
        await car.save()
        res.status(201).json(car)
    }catch (e){
        res.status(500).json({
            message: "cannot add car"
        })
        console.log(e)
    }
}
module.exports.deleteCarById = async function(req,res){
    try{
        Car.deleteOne({id: req.body.id})
    }catch (e){
        res.status(404).json({
            message: "car not found"
        })
        console.log(e)
    }
}