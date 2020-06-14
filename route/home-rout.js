const {Router}=require('express')

const router = Router()

router.get('/',(req, res)=>{
    res.render('home',{
        title:"главная",
        isHome:true
    })
})

module.exports = router