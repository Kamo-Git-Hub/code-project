const  {Schema, model} = require("mongoose")


const comentSchema = new Schema({
body:{
    type:String,
    required:true
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
username:{
    type:String
},
post:{
    type:Schema.Types.ObjectId,
    ref:"Post"
},
createdAt:{
    type:Date,
    default:Date.now
}

})


module.exports = model("Coments", comentSchema)