const {Router}= require("express")


const router = Router()

router.get('/',(req, res)=>{
    res.render('footer-content/code-editor',{
        title:"редактор кода"
    })
})


module.exports = router