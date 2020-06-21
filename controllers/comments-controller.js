const mongoose=require('mongoose');
const Post=require('../models/post');
const Comment=require('../models/comment');
const commentsMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentsEmailWorker=require('../workers/comment_email_worker');
const Like=require('../models/likes');
module.exports.create= async function(req,res){

try{
    let post = await Post.findById(req.body.post);
    
       
       if(post)
       {
       
       let comment= await Comment.create(
               {
                   content:req.body.content,
                   post:req.body.post,
    // here user is stored in locals after authenticate (locals.user),so by we fetched use_id
                   user:req.user._id,

               });
                post.comments.push(comment);
                post.save();

                 comment =await comment.populate('user','name email').execPopulate();

              // we are caliing a worker to create a queue and insert a job in queue

                 
              let job =queue.create('emails',comment).save(function(err){

                if(err){
                console.log('error in sending a job to the queue',err);
                   return;
                }

                console.log('job enqueued',job.id);

              })


        //commentsMailer.newComment(comment);
                if(req.xhr)
                {
                    return res.status(200).json({

                        data:{
                            comment:comment
                        },
                        message:'comment created succesfully'
                    })
                }

                    res.redirect('/');
               }
           
       }


catch(err)
{
    console.log('Error',err);
}

}


module.exports.destroy= async function(req,res){

    try{

        let comment=await Comment.findById(req.params.id)
    
        if(comment.user == req.user.id){

            let postId=comment.post;
            comment.remove();

           let post= await Post.findByIdAndUpdate(postId,{ $pull: {comments:req.params.id}})

        
           //:: destroy the associated like for the comments
            await Like.deleteMany({likeable:comment._id, onModel :'Comment'});

           if(req.xhr){

               return res.status(200).json({
                 
                data:{
                    comment_id:req.params.id
                },
                message:'comment deleted'
            });

           }
           

                return res.redirect('back');

            
        }
        else{
              return res.redirect('back');

        }
    }

catch(err)
{
 console.log('Error',err);   
}   
}