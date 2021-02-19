const router = require('express').Router()
const User = require('../../models/user')
const Gift = require('../../models/gift')

router.get('/', async (req, res) => {
  try {
    const gift = await Gift.findById(req.query.id).populate('author')
    res.render('private',{gift})
  } catch (error) {
    res.render('errorid',{id:req.query.id}) 
  }
})


router.get('/map/:id', async (req, res) => {
  const gift = await Gift.findById(req.params.id)//.populate('author')
  res.json(gift) 
})


module.exports = router
