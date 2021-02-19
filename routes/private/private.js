const router = require('express').Router()
const User = require('../../models/user')
const Gift = require('../../models/gift')

router.get('/', async (req, res) => {
  console.log('hello', req.query);
  try {
    const gift = await Gift.findById(req.query.id).populate('author')
    res.render('private',{gift})
  } catch (error) {
    console.log(error.message);
    res.render('errorid',{id:req.query.id}) 
  }
})


router.get('/map/:id', async (req, res) => {
  console.log( req.params.id);
  const gift = await Gift.findById(req.params.id)//.populate('author')
  console.log(gift);
  res.json(gift) 
})


module.exports = router
