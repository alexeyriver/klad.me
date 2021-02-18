const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../../models/user')
router.get('/signup',(req,res)=>{
 
res.render('signup')
})


router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  const userCheck =await User.find({email:email})
  if(!userCheck.length){
      const salt = bcrypt.genSaltSync(10)
  const hashPassword = bcrypt.hashSync(password, salt)
  const user = new User({
    name,
    email,
    password: hashPassword
  })
  res.locals.login = true;
  req.session.name = name
  req.session.email = email // ???
  // req.session.coin=user.coin

  await user.save()
  res.json({
      success: true,
      message: 'User done'
    })

  }
  else res.json({
    success: false,
    message: 'Email already use'
  })


})

module.exports= router
