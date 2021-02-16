const router = require('express').Router()
const User = require('../../models/user')
const Gift = require('../../models/gift')


router.get('/:id', async(req,res)=>{
  const gift=await Gift.findById(req.params.id)
  console.log(gift);
})



module.exports= router
