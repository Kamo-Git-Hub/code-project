const {Router} = require("express")
const Html = require("../../models/courses-model/html-model")
const Css = require('../../models/courses-model/css-model')
const JS = require('../../models/courses-model/ja-model')
const PHP = require('../../models/courses-model/php-model')
const isAdmin = require('../../middleware/isAdmin')




const router = Router()

//зашита администратора

router.get('/',isAdmin,(req, res)=>{
    res.render('admin/pages',{
        layout:"admin",
        title:"admin"
    })
})

router.post('/html',isAdmin,async (req, res)=>{
    const html = new Html({
        title:req.body.title,
        content:req.body.content,
        code:req.body.code
    })
    await html.save()
    res.redirect('/courses/html')
})



router.post('/css',isAdmin,async (req, res)=>{
    const css = new Css({
        title:req.body.title,
        content:req.body.content,
        code:req.body.code
    })
    await css.save()
   
    res.redirect('/courses/css')
})

router.post('/java-script',isAdmin,async(req, res)=>{
    const js = new JS({
        title:req.body.title,
        content:req.body.content,
        code:req.body.code
    })
    await js.save()
    res.redirect('/courses/javascript')
})



router.post('/php',isAdmin,async(req, res)=>{
    const php = new PHP({
        title:req.body.title,
        content:req.body.content,
        code:req.body.code
    })
    await php.save()
    res.redirect('/courses/php')
})










///edit==============================================================


///html=======================================================================

router.get('/:id/edit-html', async(req, res)=>{
    if(!req.query.mail){
        res.redirect('/')
    }
    const html = await Html.findById(req.params.id)
    
    res.render('admin/edit',{
        title:html.title,
        html:JSON.parse(JSON.stringify(html)),
    })
})


router.post('/html-edit', async(req, res)=>{
    await Html.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/courses/html')
})

//css============================================================================
router.get('/:id/edit-css', async(req, res)=>{
    if(!req.query.mail){
        res.redirect('/')
    }
    const css = await Css.findById(req.params.id)
    res.render('admin/edit',{
        title:css.title,
        css:JSON.parse(JSON.stringify(css))
    })
})


router.post('/css-edit', async(req, res)=>{
    await Css.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/courses/css')
})

//js=========================================================

router.get('/:id/edit-js', async(req, res)=>{
    if(!req.query.mail){
        res.redirect('/')
    }
    const js = await JS.findById(req.params.id)
    res.render('admin/edit',{
        title:js.title,
        js:JSON.parse(JSON.stringify(js))
    })
})


router.post('/js-edit', async(req, res)=>{
    await JS.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/courses/javascript')
})


//php=====================================================
router.get('/:id/edit-php', async(req, res)=>{
    if(!req.query.mail){
        res.redirect('/')
    }
    const php = await PHP.findById(req.params.id)
    res.render('admin/edit',{
        title:php.title,
        php:JSON.parse(JSON.stringify(php))
    })
})


router.post('/php-edit', async(req, res)=>{
    await PHP.findByIdAndUpdate(req.body.id, req.body)
    res.redirect('/courses/php')
})

module.exports =router
