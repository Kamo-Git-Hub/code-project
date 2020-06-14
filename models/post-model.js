const  {Schema, model} = require("mongoose")


const postSchema = new Schema({
   title:{
       type:String,
       required:true
   },
   content:{
       type:String,
       required:true
   },
    owner:{
        type:String
    },
    url:{
        type:String
    }
})


module.exports = model("Post", postSchema)