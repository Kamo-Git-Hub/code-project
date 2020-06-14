const {Router}=require('express')
const Tape = require('../models/tape-model')
const urlSec = require('../middleware/url-security')



const router = Router()

router.get('/',urlSec,(req, res)=>{
    res.render('add',{
        title:"добавить",
        isAdd:true
    })
})


router.post('/',urlSec, async(req, res)=>{
    try{
        const tape = new Tape({
            title:req.body.title,
            content:req.body.content,
            userId:req.user
        })
        
        await tape.save()
        res.redirect('/tape')
    }catch(e){
        console.log(e)
    }
})


module.exports = router