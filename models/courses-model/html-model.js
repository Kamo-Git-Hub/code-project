const {Schema, model} = require('mongoose')

const htmlModel = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
})

module.exports = model("Html", htmlModel)