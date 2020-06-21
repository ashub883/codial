const User=require('../models/user');
const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;

// extract jwt is used to extract jwt(json web token ) from header
const ExtractJWT=require('passport-jwt').ExtractJwt;

const env=require('./enviroment');
//  taken short form(authorization-auth)
/* there is list of Keys present  in a header from that we extract auth key in header and auth  furthur  
contain a list of keys in which there is a key bearer */

let opts={

    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:env.jwt_secret_key
}

passport.use( new JWTStrategy(opts,function(jwtPayLoad ,done){

    User.findById(jwtPayLoad._id,function(err,user)
    {

        if(err){ console.log(err); return }
        
        if(user)
        {
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })


})

)

module.exports=passport;