const router = require('express').Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const fs = require('fs').promises;
const path = require('path');
const User = require('../../models/user')
const Gift = require('../../models/gift')
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
const user = await User.findOne({email:req.session.email})
let imgurl= req.file.path.split('\\')[2]
imgurl='uploads/'+imgurl
const gift =  new Gift({name:req.body.name,description: req.body.description, location:req.body.coord, img: imgurl, author: user })
user.createdGift.push(gift);
await user.save()
await gift.save()
res.json(gift)
})

router.get('/searchgift',async (req,res)=>{
  const gift=await Gift.find({flag:true}).populate('author')
  res.json(gift)
})

module.exports= router
