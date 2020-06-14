const {Router}=require('express')
const Tape = require("../models/tape-model")
const urlSec = require('../middleware/url-security')





const router = Router()

router.get('/',async(req, res)=>{
    const tape = await Tape.find().populate("userId")
    res.render('tape',{
        title:"лента",
        isTape:true,
        tape:JSON.parse(JSON.stringify(tape)),
        userId:req.user?req.user._id.toString():null
    })
   
})


router.get('/:id/edit',urlSec, async(req, res)=>{
    const tape = await Tape.findById(req.params.id)
    if(!req.query.mail){
        res.redirect('/')
    }
    res.render('edit',{
        title:tape.title,
        tape:JSON.parse(JSON.stringify(tape))
    })
})

router.post('/edit',urlSec, async(req, res)=>{
    await Tape.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/tape')
})

router.post('/remove',urlSec, async(req, res)=>{
    await Tape.findByIdAndDelete({_id:req.body.id})
    res.redirect('/tape')
})

module.exports = router