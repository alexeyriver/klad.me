const router = require('express').Router()

router.get('/:id',(req,res)=>{
console.log(req.params.id,'hohohoho') 
res.render('index')
})


module.exports= router
