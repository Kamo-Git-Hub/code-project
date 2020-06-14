const {Router}= require("express")
const User = require("../models/user-model")
const Tape = require('../models/tape-model')
const Html = require('../models/courses-model/html-model')
const JS = require('../models/courses-model/ja-model')
const CSS = require('../models/courses-model/css-model')
const PHP = require('../models/courses-model/php-model')
const urlSec = require('../middleware/url-security')

const router = Router()

router.get('/',urlSec, async(req, res)=>{
   const items =await req.user.profile.tape.toObject()

    res.render("profile",{
        title:"профиль",
        isProfile:true,
        user:req.user.toObject(),
        items:JSON.parse(JSON.stringify(items))
    })
   
})


router.post('/',urlSec, async(req, res)=>{
try{
    const toChange ={
        name:req.body.name,
        github:req.body.github,
        socialNetwork:req.body.socialNetwork,
    }

    if(req.file){
        toChange.avatarUrl =req.file.path
    }

    const user = await (await User.findById(req.user._id))

    Object.assign(user, toChange)
    await user.save()
    res.redirect('/profile')
}catch(e){
    console.log(e)
}
})



router.post('/add/tape',urlSec, async(req, res)=>{
        //запретить дублирование урока
 
        const tape = await  Tape.findById(req.body.id)
       
        await req.user.addToUserProfile(tape)
         res.redirect('/profile')
    
       }
   
)

//profile-tape==============================================

router.post('/remove/tape-item', async(req, res)=>{
    await req.user.removeProfileTapeItem(req.body.id)
    res.redirect('/profile')
})



//html===================================================
router.get('/html-page', async(req, res)=>{
    const html = await req.user.courses.htmlArray.html.toObject()
    res.render('profile/html-page',{
        title:"html",
        html:JSON.parse(JSON.stringify(html))
    })
})

router.post('/add-html', urlSec, async(req, res)=>{
    const html = await Html.findById(req.body.id)
    
    await req.user.addToUserHtmlFolder(html)

    res.redirect('/profile/html-page')
})


router.post('/remove-html',urlSec,async(req, res)=>{
    
    await req.user.removeHtmlCours(req.body.id)
    res.redirect('/profile/html-page')
} )




//javascript============================================================
router.get('/js-page', async(req, res)=>{
    const js = await req.user.courses.jsArray.js.toObject()
    res.render('profile/js-page',{
        title:"js",
        js:JSON.parse(JSON.stringify(js))
    })
})

  

router.post('/javascript',urlSec, async(req, res)=>{
    const js = await JS.findById(req.body.id)
    await req.user.addToUserJSFolder(js)

    res.redirect('/profile/js-page')
})
    

router.post('/remove-js',urlSec,async(req, res)=>{
    
    await req.user.removeJsCours(req.body.id)
    res.redirect('/profile/js-page')
} )





//css==================================================================
router.get('/css-page', async(req, res)=>{
    
    const css =await req.user.courses.cssArray.css.toObject()
    res.render('profile/css-page',{
        title:"css",
        css:JSON.parse(JSON.stringify(css))
    })
})





router.post('/css',urlSec, async(req, res)=>{
    const css = await CSS.findById(req.body.id)
    await req.user.addToUserCssFolder(css)

    res.redirect('/profile/css-page')
})



router.post('/remove-css',urlSec,async(req, res)=>{
    
    await req.user.removeCssCours(req.body.id)
    res.redirect('/profile/css-page')
} )

    

//php=============================================================
router.get('/php-page',urlSec, async(req, res)=>{
    
    const php =await req.user.courses.phpArray.php.toObject()
    res.render('profile/php-page',{
        title:"php",
        php:JSON.parse(JSON.stringify(php))
    })
})





router.post('/php',urlSec, async(req, res)=>{
    const php = await PHP.findById(req.body.id)
    await req.user.addToUserPhpFolder(php)
    res.redirect('/profile/php-page')
})


router.post('/remove-php',urlSec,async(req, res)=>{
    
    await req.user.removePhpCours(req.body.id)
    res.redirect('/profile/php-page')
} )











module.exports = router