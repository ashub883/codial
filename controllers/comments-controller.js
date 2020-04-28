const mongoose=require('mongoose');
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){

    Post.findById(req.body.post,function(err,post)
    {
       if(err)
       { console.log('post does not exist'); return }
       if(post)
       {
           Comment.create(
               {
                   content:req.body.content,
                   post:req.body.post,
    // here user is stored in locals after authenticate (locals.user),so by we fetched use_id
                   user:req.user._id,

               },function(err,comment)
               { 
                   if(err)
                { console.log('err comment cant be  created' ); return }

                post.comments.push(comment);
                post.save();

                    res.redirect('/');
               }
           );
       }

    });
}

module.exports.destroy=function(req,res){

    Comment.findById(req.params.id,function(err,comment)
    {
        if(comment.user == req.user.id){

            let postId=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId,{ $pull: {comments:req.params.id}},function(err,post)
            {

                return res.redirect('back');

            });
            
        }
        else{
              return res.redirect('back');

        }

    });
}