const {Router} = require("express")
const JS = require('../../models/courses-model/ja-model')


const router = Router()

router.get('/javascript', async(req, res)=>{
    const js = await JS.find()
    res.render("courses/javascript",{
        title:"JavaScript",
        js:JSON.parse(JSON.stringify(js))
    })
})

router.get('/javascript/:id', async(req, res)=>{
    const js = await JS.findById(req.params.id)
    res.render('courses/course/js-course',{
        title:"JavaScript",
        js:JSON.parse(JSON.stringify(js))
    })
})




module.exports = router