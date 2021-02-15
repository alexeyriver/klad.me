const router = require('express').Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const fs = require('fs').promises;
const path = require('path');
var upload = multer({ dest: './public/uploads/' })
// const storageConfig = multer.diskStorage({
//   destination: (req,file,cb)=>{
//     cb(null, './public/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   }
// });
// const uplooad = multer({ storage: storageConfig }).single('img');
 
// const upload = multer({
//   storage: storage,
// });



router.post('/creategift',upload.single('img') , async (req,res)=>{

  console.log(req.body);
  console.log(req.file);


  // await fs.writeFile(
  //   path.join(__dirname, '../public/uploads', `${req.file.originalname}`),
  //   req.file.buffer
  // );


})

router.get('/searchgift',(req,res)=>{
  

})

module.exports= router
