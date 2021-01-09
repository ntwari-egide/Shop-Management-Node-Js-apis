module.exports= function (req,res,next){
    if(!req.user.isAdmin) return res.send('Access denied for this')
    next();
}