const User=require('../../../models/user');
// beacause in jwt there is no cookie present , so it generate token when req comesy
const jwt=require('jsonwebtoken');
const env=require('../../../config/enviroment');

module.exports.createSession= async function(req,res){

try{

    let user=await User.findOne({email:req.body.email});

    if(!user||user.password!=req.body.password)
    {
        return res.json(422,{
            message:'Invalid username or password'
        });
    }

    return res.json(200,{

        message:'Signed in successfully',
        data:{
            token:jwt.sign(user.toJSON(),env.jwt_secret_key,{expiresIn:'10000'})
        }
    })

}
catch(err)
{
    console.log('eerrr',err);
    return res.json(500,{
        message:'Internal server not found'
    });
}


}