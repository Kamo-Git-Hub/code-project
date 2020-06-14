const {Schema, model} = require("mongoose")

const tapeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})


module.exports = model("Tape", tapeSchema)