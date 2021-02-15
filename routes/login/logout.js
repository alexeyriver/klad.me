const router = require('express').Router()

router.get('/logout',async(req,res)=>{
  
  await req.session.destroy();
  res.clearCookie("user_sid");
  res.redirect('/')

})


module.exports= router
