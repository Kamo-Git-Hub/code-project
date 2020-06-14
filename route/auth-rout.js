const {Router} = require("express")
const User = require("../models/user-model")
const bcrypt = require("bcryptjs")
const {authValidator} = require("../utils/validators")
const {validationResult}=require('express-validator')
const config = require("../keys/keys")
const nodemailer = require("nodemailer")
const sendgrid = require("nodemailer-sendgrid-transport")
const regEmail = require('../emails/registration')
const crypto = require("crypto")
const resetPassword = require('../emails/reset-password')




const router = Router()

const transporter = nodemailer.createTransport(sendgrid({
    auth:{api_key:config.SEND_GRID_API_KEY}
}))


router.get('/login', async(req, res)=>{
    res.render('auth/login',{
        isLogin:true,
        title:"Авторизация",
        error:req.flash("error")
    })
})


router.post('/login', async(req, res)=>{
    const {email, password}=req.body
    const candidate = await User.findOne({email})
    if(candidate){
        const pass = await bcrypt.compare(password, candidate.password)
        if(pass){
            req.session.user = candidate
            req.session.isAuthorized = true
            req.session.save(err=>{
                if(err)throw err
                res.redirect('/')
            })
        }else{
            req.flash("error", "не верный логин или пароль")
            res.redirect('/auth/login')
        }
        
    }else{
        req.flash("error", "не верный логин или пароль")
        res.redirect('/auth/login')
    }
   

})

router.get('/logaut',(req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/auth/login')
    })
})

router.post('/register',authValidator, async(req, res)=>{
    const {password, name, email, male, female}=req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash("error",errors.array()[0].msg)
        return res.status(422).redirect("/auth/login#register")
    }
   
        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password:hashPassword, name,male, female})
        await user.save()
        res.redirect('/auth/login')
        await transporter.sendMail(regEmail(email))
    
})


router.get('/reset', (req, res)=>{
    res.render('auth/reset',{
        title:"забыли пароль?",
        error:req.flash("error")
    })
})


router.post('/reset',(req, res)=>{
    try{
        crypto.randomBytes(32, async (err, buffer)=>{
if(err){
    req.flash("error", "Что-то пошло не так, повторите попытку позже")
   return res.redirect('/auth/reset')
}

const token = buffer.toString("hex")
const candidate = await User.findOne({email:req.body.email})
if(candidate){
    candidate.resetToken = token
    candidate.resetTokenExp = Date.now()+60*60*1000
    await candidate.save()
    await transporter.sendMail(resetPassword(candidate.email, token))
    res.redirect('/auth/login')
}else{
    req.flash("error", "неправильный адрес электронной почты")
    res.redirect('/auth/reset')
}

        })
    }catch(e){
        console.log(e)
    }
})

router.get('/password/:token',async (req, res)=>{

    if(!req.params.token){
        return res.redirect('/auth/login')
    }

    const user = await User.findOne({
        resetToken:req.params.token,
        resetTokenExp:{$gt:Date.now()}
    })

    if(!user){
        return res.redirect('/auth/login')
    }else{

        res.render('auth/password',{
            title:"востановить доступ?",
            error:req.flash("error"),
            userId: user._id.toString(),
            token:req.params.token
        })
        
    }
    try{

    }catch(e){
        console.log(e)
    }
})


router.post('/password', async(req, res)=>{
    try{
        const user = await User.findOne({
            _id:req.body.userId,
            resetToken:req.body.token,
            resetTokenExp:{$gt:Date.now()}
        })
        
        if(user){
            user.password = await bcrypt.hash(req.body.password,12)
            user.resetToken =undefined
            user.resetTokenExp =undefined
            await user.save()
            res.redirect('/auth/login')
        }else{
            req.flash("error", "Произошла угроза безопасности, пожалуйсто повторите процесс заново")
            res.redirect('/auth/login')
        }
    }catch(e){
        console.log(e)
    }
})


// router.post('/password', async(req, res)=>{
//     try{
// const user = await User.findOne({
//     _id:req.body.userId,
//     resetToken:req.body.token,
//     resetTokenExp:{$gt:Date.now()}
// })
// if(user){
//     //2===========================================================
//     user.password = await bcrypt.hash(req.body.password,12)
//     user.resetToken = undefined,
//     user.resetTokenExp= undefined
//     await user.save()
//     res.redirect('/auth/login')
// }else{
//     req.flash("logError", "токен не действителен")
//     res.redirect("/auth/login")
// }
//     }catch(e){
//         console.log(e)
//     }
// })

module.exports = router