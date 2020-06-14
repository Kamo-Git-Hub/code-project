const config = require('../keys/keys')

module.exports = function(req, res, next){
  if(req.user.id!==config.ADMIN){
    return  res.redirect('/!!!error')
     
  }
    next()
}