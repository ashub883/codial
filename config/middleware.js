// we will find the flash from the  request and set it in the locals of the response and that locals we can use in views

module.exports.setFlash=function(req,res,next)
{

    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}