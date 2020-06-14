const {Schema, model} = require('mongoose')

const jsSchema = new Schema({
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

module.exports = model("JS", jsSchema)