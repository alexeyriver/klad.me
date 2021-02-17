const router = require('express').Router()

router.get('/:id',(req,res)=>{
console.log(req.params.id); 
res.render('index')
})


module.exports= router
