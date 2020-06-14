const {Router} = require("express")
const Html = require("../../models/courses-model/html-model")



const router = Router()



router.get('/html',async (req, res)=>{
    const html = await Html.find()
    res.render('courses/html',{
        title:"html",
        html:JSON.parse(JSON.stringify(html))
    })
  
})

router.get(`/html/:id`,async(req, res)=>{
    const html = await Html.findById(req.params.id)
    res.render('courses/course/html-cours',{
        title:html.title,
        html:JSON.parse(JSON.stringify(html))
    })
})


module.exports =router