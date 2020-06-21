const Post=require('../models/post');
const User=require('../models/user');


module.exports.home= async function(req,res){

    try{
    /*
    let posts= await Post.find({})
    .sort('-createdAt')
   .populate('user')
   .populate({                      
                                                  
      path:'comments',
      populate:{
          path:'user'
      },
      populate:{
          path:'likes'
      }

   }).populate('likes');
   
   */
  let posts = await Post.find({})
  .sort('-createdAt')
  .populate('user')
  .populate('likes')
  .populate({
    path: 'comments',
    populate: {
      path: 'user',
      populate:{
          path:'likes',
      }
    }
  });

 
 
   // we have populate likes from post and their comments to know the count of likes
        let users= await User.find({})
       
           return res.render('home',{
               tittle:"Codial  Home",
               posts:posts,
               all_users:users
           });       
   }
catch(err){

    console.log('err', error in finding );
    return;
}

}