const router = require('express').Router()

router.get('/',(req,res)=>{
  if (req.session.name) {
   res.render('index')
  }
  else 
  res.redirect('/signin')

})


module.exports= router
