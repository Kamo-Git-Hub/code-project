const config = require("../keys/keys")
const mongoose = require("mongoose")

module.exports = async function(app){
    try{
        mongoose.connect(config.MONGO_URI,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
                useFindAndModify:false
        })
        app.listen(process.env.PORT||3000,()=>{
            console.log(`port listen 3000...`)
        })
        
    }catch(e){
        console.log(e)
    }
}