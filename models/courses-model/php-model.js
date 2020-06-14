const {Schema, model} = require('mongoose')

const phpSchema = new Schema({
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

module.exports = model("PHP", phpSchema)