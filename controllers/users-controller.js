const User=require('../models/user');
const fs=require('fs');
const path=require('path');
/*module.exports.profile=function(req,res){
     
     if(req.cookies.user_id){

      User.findById(req.cookies.user_id,function(err,user)
      {
           if(user){
                return res.render('user-profile',{
                 tittle:"User",
                 user:user     
                });
               }
           return res.redirect('/users/signin');
          }); 
       }  else{
                 return res.redirect('/users/signin');
           }
     }         */

     module.exports.profile= function(req,res){

          User.findById(req.params.id,function(err,user)
          {
               return res.render('user-profile',{
                    tittle:'profile',
                    profile_user:user
     
               });
          } );
     }
     module.exports.update= async function(req,res)
     {

      /* if(req.user.id == req.params.id)
      {

          User.findByIdAndUpdate(req.params.id,req.body,function(err,user){

                   return res.redirect('back');
          });
      }
      else{

          return res.status(401).send('Unauthorised');
      }

 */
if(req.user.id == req.params.id)
      {
       try{
          
          let user=await User.findById(req.params.id);
          User.uploadedAvatar(req,res,function(err){
               
               if(err){ console.log('multer error',err)}

               user.name=req.body.name;
               user.email=req.body.email;
               //console.log(req.file);

               if(req.file)
               {

                  //  if(user.avatar)
                    //{
                      //   fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    //}
                    user.avatar=User.avatarPath+'/'+ req.file.filename;
               }                     
               user.save();
               return res.redirect('back');

          })


       }
       catch(err)
       {
            req.flash('error',err);
          return res.redirect('back');

       }

      }

      else{
           req.flash('error','unauthorised');
          return res.status(401).send('Unauthorised');

      }
     
     }


module.exports.sign_in=function(req,res){

     if(req.isAuthenticated())
     {
        return res.redirect('/users/profile');
     }

     return res.render('user_sign_in',{

          tittle:"Sign in"
     });
}
module.exports.sign_up=function(req,res){
     if(req.isAuthenticated())
     {
        return res.redirect('/users/profile');
     }

     return res.render('user_sign_up',{
          tittle:"Sign up"
     });
}
//to sign up for user
module.exports.create=function(req,res){
if(req.body.password != req.body.confirmpassword){

     return res.redirect('back');
}

User.findOne({email:req.body.email},function(err,user)
{
if(err){console.log('error in finding user in signing up')}

 if(!user)
 {
      User.create(req.body,function(err,user){
           if(err){ console.log('error in creating user while signing up'); return}

           return res.redirect('/users/signin');

      });
 }
 else{
      return('back');
 }

});
}
    /* module.exports.createSession=function(req,res){

 //steps to authenticate 
 
 //find the user
 User.findOne({email:req.body.email},function(err,user)
 {
      if(err){  console.log('error in finding user' ); return}
     
      //User found
      if(user)
      {
          if(user.password !=req.body.password){

               return res.redirect('back');
          }
          //handle session creation

          res.cookie('user_id',user.id);
            return res.redirect('/users/profile')
      }
      // user not found
else{
    return res.redirect('back');

}
 });
} */
module.exports.createSession=function(req,res){

     req.flash('success','Logged in successfully');
        return res.redirect('/');

}


module.exports.destroyedSession=function(req,res){

     // passport gives logout function to request to logout
     req.logout();

     req.flash('success','Logged out successfully');
     return res.redirect('/');

}
