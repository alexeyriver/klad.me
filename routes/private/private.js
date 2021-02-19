const router = require('express').Router()
const User = require('../../models/user')
const Gift = require('../../models/gift')

router.get('/', async (req, res) => {
  console.log('hello', req.query);
  const gift = await Gift.findById(req.query.id).populate('author')
  console.log(gift);
  if (gift) {
    res.render('private',{gift})
  }
  else { res.json({ status: false }) }

})
router.get('/map/:id', async (req, res) => {
  console.log( req.params.id);
  const gift = await Gift.findById(req.params.id)//.populate('author')
  console.log(gift);
  
  res.json(gift) 
})


module.exports = router
