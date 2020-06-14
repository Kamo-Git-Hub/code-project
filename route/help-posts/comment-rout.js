const {Router} = require("express")
const Comments = require("../../models/comment-model")

const router = Router()


router.post('/add',async (req, res)=>{
const username = req.user.name
const userId = req.user._id.toString()
    const comments = new Comments({
        body:req.body.body,
        post:req.body.post,
        owner:userId,
        username:username
        
    })
    
 res.send({
     name:username,
     owner:userId
 })
   
    await comments.save()
})




module.exports = router