const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../../models/user')

router.get('/signin',(req,res)=>{
res.render('signin')
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const candidate = await User.findOne({ email: email })
  if (candidate) {
    if (bcrypt.compareSync(password, candidate.password)) {
      res.locals.login = true;
      req.session.name = candidate.name 
      req.session.email = candidate.email 
      req.session.coin=candidate.coin
      res.json({
        success: true,
        message: 'User in'
      })
    } else {
      res.json({
        success: 'invalid',
        message: 'Invalid User or password'
      })
    }
  } else {
    res.json({
      success: false,
      message: 'User don`t found'
    })
  }
})


module.exports= router
