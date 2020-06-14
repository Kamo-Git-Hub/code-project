const {Router} = require("express")
const Css = require("../../models/courses-model/css-model")



const router = Router()



router.get('/css', async (req, res)=>{
   
    const css = await Css.find()
    res.render('courses/css',{
        title:"courses/css",
        css:JSON.parse(JSON.stringify(css)),
       
    })
 
})

router.get(`/css/:id`,async(req, res)=>{
  try{
    const css = await Css.findById(req.params.id)
    res.render('courses/course/css-course',{
        title:css.title,
        css:JSON.parse(JSON.stringify(css))
    })
  }catch(e){
      console.log(e)
  }
})


module.exports =router