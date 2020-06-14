const {Router}=require('express')
const Post = require('../../models/post-model')
const Comment = require('../../models/comment-model')


const router = Router()

router.get('/post',async(req, res)=>{
   
    const post = await Post.find()
    res.render('help-posts/posts',{
        title:"Спроси",
        isPost:true,
        post:JSON.parse(JSON.stringify(post))
    })
 
    
})


router.post('/post', async(req, res)=>{
    const username =await req.user.name
    const url = await req.user._id
    const posts = new Post({
        title:req.body.title,
        content:req.body.content,
        owner:username,
        url
    })
    res.redirect('/help-posts/post')
   await posts.save()
  
   
})

/

router.get('/post/:id', async(req, res)=>{
    const post = await Post.findById(req.params.id)
    const comment = await Comment.find({post:post._id})
    res.render("help-posts/comments",{
        title:post.title,
        post:JSON.parse(JSON.stringify(post)),
        comment:JSON.parse(JSON.stringify(comment))
    })

  
})

module.exports = router