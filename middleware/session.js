const session = require("express-session")
const MongoStore = require("connect-mongodb-session")(session)
const config = require("../keys/keys")

const store = new MongoStore({
    collection:"session",
    uri:config.MONGO_URI
})

module.exports = function(app){
    return app.use(session({
        secret:config.SECRET,
        resave:false,
        saveUninitialized:false,
        store
    }))
}