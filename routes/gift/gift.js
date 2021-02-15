const router = require('express').Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const fs = require('fs').promises;
const path = require('path');
const storageConfig = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const uplooad = multer({ storage: storageConfig }).single('img');
 

router.post('/creategift',uplooad, async (req,res)=>{

  console.log(req.body);
  console.log(req.file);

})

router.get('/searchgift',(req,res)=>{
  

})

module.exports= router
