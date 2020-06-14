const {Router} = require("express")
const PHP = require("../../models/courses-model/php-model")



const router = Router()



router.get('/php',async (req, res)=>{
    const php = await PHP.find()
    res.render('courses/php',{
        title:"php",
        php:JSON.parse(JSON.stringify(php))
    })
   
  
})

router.get(`/php/:id`,async(req, res)=>{
    const php = await PHP.findById(req.params.id)
    res.render('courses/course/php-cours',{
        title:php.title,
        php:JSON.parse(JSON.stringify(php))
    })
   
})


module.exports =router