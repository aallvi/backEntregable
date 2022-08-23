


const {Router}= require('express')
const multer = require('multer');
const { userModel } = require('../models/user');


const router = Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
  })
  
  
  const upload = multer({ storage: storage }).single('file')
  

router.post('/upload',function(req, res) {

    // console.log(req.body.pick)
       
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
  
    })
  
  });


  
router.post('/uploadMongo',async(req, res) =>{
  
    console.log(req.body.pick)
  
    console.log(req.body.email)
    try {
  
   const response = await userModel.update({'email':req.body.email}, { $set : {'foto':req.body.pick} })
  
   console.log(response)
      
    } catch (error) {
      console.log(error)
    }
  
       
  
  
  });



  module.exports = router