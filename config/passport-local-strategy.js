const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

passport.use(new LocalStrategy({

    usernameField:'email',
    passReqToCallback:true
},
function(req, email,password,done){

    User.findOne({email:email},function(err,user)
    {
        if(err){ 
          req.flash('error',err);
        return done(err)
      }

           if(!user || user.password != password){
             req.flash('error','Invalid Username/Password');
               return done(null,false);
           }

           return done(null,user);
    });

}
));

//serialising user to decide which key should be put in cookies when the user authenticate

passport.serializeUser(function(user,done){
     done(null,user.id);
});

//deseralising the user from the key in the cookies(when the browser make a request then we have to deserialise key(userid ) stored in a cookie and found a user again by this function


passport.deserializeUser(function(id,done){

  User.findById(id,function(err,user){

    if(err){ console.log('err in finding cookie'); return done(err)}

    return done(null,user);
  });

});


//to check user is authenticated or not (it is a middleware)   sending date current user to views

passport.checkAuthentication=function(req,res,next){

  //passport put a method on request that we are using
  
  //if the user is signed in  then pass on request to the next function (controller's action)


    if(req.isAuthenticated())
    {
           return next();
    }
     return res.redirect('/users/signin');

}
passport.setAuthenticatedUser=function(req,res,next){

  if(req.isAuthenticated()){
//req.user contained the info. of current sign in user from the session cookie and just sending this to the locals for the views


    res.locals.user=req.user;

  }
         next();

}
module.exports=passport;