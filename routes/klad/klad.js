const router = require('express').Router()
const User = require('../../models/user')
const Gift = require('../../models/gift')

router.get('/', async (req, res) => {
  const user = await User.findOne({ email: req.session.email }).populate('recievedGift')
  user.recievedGift = user.recievedGift.filter((el) => el.done == 'create')
  res.render('klad', user)
})


router.get('/:id', async (req, res) => {
  const gift = await Gift.findById(req.params.id)
  const user = await User.findOne({ email: req.session.email }).populate('recievedGift')
  if (gift && !user.recievedGift.find(el => el.id === req.params.id)) {
    gift.flag = false
    user.recievedGift.push(gift)
    await gift.save()
    await user.save()
  }
  res.render('kladfindone', gift)
})

router.get('/finish/:id', async (req, res) => {
  const gift = await Gift.findById(req.params.id).populate('author')
  const user = await User.findById(gift.author._id)
  gift.done = 'finish';
  user.coin += 5
  await gift.save()
  await user.save()
  res.json({ status: true })
})

module.exports = router
