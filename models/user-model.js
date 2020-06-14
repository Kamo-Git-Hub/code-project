const {Schema, model}= require("mongoose")

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    resetTokenExp:Date,
    avatarUrl:String,
  courses:{
    htmlArray:{html:[]},
    cssArray:{css:[]},
    jsArray:{js:[]},
    phpArray:{php:[]},
  },
  profile:{
      tape:[]
  },

    github:String,
    socialNetwork:String,
    male:String,
    female:String
   
})

//tape

userSchema.methods.addToUserProfile = function(item){
    let tape = [...this.profile.tape]
   
    tape.push(item)
    this.profile={tape}
    return this.save()
}


userSchema.methods.removeProfileTapeItem = function(id){
    let tape = [...this.profile.tape]
    tape = tape.filter(i=>i._id.toString()!==id.toString())
    this.profile ={tape}
     return this.save()

}

//html==================================================
userSchema.methods.addToUserHtmlFolder = function(item){
    let html = [...this.courses.htmlArray.html]
   
    html.push(item)
    this.courses.htmlArray ={html}
    return this.save()
}



userSchema.methods.removeHtmlCours = function(id){
    let html = [...this.courses.htmlArray.html]
    html= html.filter(i=>i._id.toString()!==id.toString())
    this.courses.htmlArray ={html}
     return this.save()

}

userSchema.methods.removeCours = function(id){
    let html = [...this.courses.htmlArray.html]
    html= html.filter(i=>i._id.toString()!==id.toString())
    this.courses.htmlArray ={html}
     return this.save()

}




//js====================================================
userSchema.methods.addToUserJSFolder = function(item){
    let js = [...this.courses.jsArray.js]
   
    js.push(item)
    this.courses.jsArray ={js}
    return this.save()
}


userSchema.methods.removeJsCours = function(id){
    let js = [...this.courses.jsArray.js]
    js= js.filter(i=>i._id.toString()!==id.toString())
    this.courses.jsArray ={js}
     return this.save()

}

//css=================================================
userSchema.methods.addToUserCssFolder = function(item){
    let css = [...this.courses.cssArray.css]
   
    css.push(item)
    this.courses.cssArray ={css}
    return this.save()
}


userSchema.methods.removeCssCours = function(id){
    let css = [...this.courses.cssArray.css]
    css= css.filter(i=>i._id.toString()!==id.toString())
    this.courses.cssArray ={css}
     return this.save()

}

//php====================================================


userSchema.methods.addToUserPhpFolder = function(item){
    let php = [...this.courses.phpArray.php]
   
    php.push(item)
    this.courses.phpArray ={php}
    return this.save()
}



userSchema.methods.removePhpCours = function(id){
    let php = [...this.courses.phpArray.php]
    php= php.filter(i=>i._id.toString()!==id.toString())
    this.courses.phpArray ={php}
     return this.save()

}








module.exports = model("User", userSchema)


