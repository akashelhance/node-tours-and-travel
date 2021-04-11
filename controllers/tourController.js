
const { findByIdAndDelete } = require('../models/tourModel');
const Tour = require('../models/tourModel')





exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTours = async (req, res) => {
    try {
        const tours=  await Tour.find();

        res.status(200).json({
         status: 'success',
         result: tours.length,
         data: {
             "tours": tours
         },
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            
            data: {
                "message": error,
            },
           });  
    }
};

exports.getTour = async(req, res) => {
    const tour= await Tour.findById(req.params.id)
 
    try {

        res.status(200).json({
            status: "sucess",
            data:{
                "tour": tour,
            },
        });
        
    } catch (error) {
        

        res.status(400).json({
            status: "failed",
            message: error
        });
    }
  
};

exports.createTour = async(req, res) => {
    const { name, rating, price } = req.body;

    tour = new Tour({
        name,
        rating,
        price,
      });

      await tour.save();

      res.json({"data": tour})

};

exports.updateTour = async (req, res) => {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          tour
        }
      });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error
      });
    }
  };

exports.deleteTour = async(req, res) => {
 try {
    const tours = await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
        data: tours
      });

 } catch (error) {
    res.status(404).json({
        status: 'fail',
        message: error
      });
 }
};