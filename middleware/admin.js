const config = require("../keys/keys")

module.exports =async function(req, res, next){
    const candidate =await req.user
  if(!candidate){
      return next()
  }
  const admin =  req.user._id.toString()==config.ADMIN
  res.locals.isAdmin =admin
    next()
}

