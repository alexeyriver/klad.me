const router = require('express').Router()
const User = require('../../models/user')
const Gift = require('../../models/gift')

router.get('/',async (req,res)=>{
  const user = await User.findOne({email: req.session.email}).populate('recievedGift')
  let result=user.recievedGift.filter((el)=>{if (el.done=='finish') return el})
  res.render('history',{result})
})


module.exports= router
