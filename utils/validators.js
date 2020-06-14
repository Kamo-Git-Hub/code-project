const {body} = require("express-validator")
const User = require('../models/user-model')
exports.authValidator =[
body("email").isEmail().withMessage("введите коректный email").custom(async(value,{req})=>{
    try{
        const user = await User.findOne({email:value})
        if(user){
            return Promise.reject("данная почта уже используется")
        }
    }catch(e){
        console.log(e)
    }
}),
body("password").isLength({min:5}).withMessage("пароль должен содержать не менее пяти символов")
.isAlphanumeric().withMessage("пароль должен содержать только латинские символы"),
body("confirm").custom((value,{req})=>{
    if(value!==req.body.password){
        throw new Error("пороли не совпадают")
    }else{
        return true
    }
}),
body("name").isLength({min:3}).withMessage("имя должно содержать минимум 3 символа")
]