const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=function(req,res){
    
 /*  Post.find({},function(err,post)
    {
        if(err){ console.log('error in finding post'); return}

        return res.render('home',{
            tittle:"home",
            post:post
        });
    }); */

   //this is to populate the whole object by 
  /*  Post.find({}).populate('user').exec(function(err,post){

        if(err){ console.log('error in finding post'); return}

        
        return res.render('home',{
            tittle:"home",
            post:post
        });

    })  */

Post.find({})
.populate('user')
.populate({
   path:'comments',
   populate:{
       path:'user'
   }

})
.exec(function(err,posts)
{

    User.find({},function(err,users)
    {

        return res.render('home',{
            tittle:"Codial  Home",
            posts:posts,
            all_users:users
        });
    
    });


   
});






























}