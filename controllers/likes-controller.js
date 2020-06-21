const Like=require('../models/likes');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.toggleLike= async function(req,res){

    try{

        //likes/toggle/?id=abcd&type=post
       let likeable;
       let deleted=false;
       if(req.query.type === 'Post')
       {
           likeable=await Post.findById(req.query.id).populate('likes')
       }
       else{
        likeable=await Comment.findById(req.query.id).populate('likes');
       }
       //check if a like already exist
       let existingLike=await Like.findOne({

        likeable:req.query.id,
        onModel:req.query.type,
        user:req.user._id
       });

       // if a like already exist then delete it
       if(existingLike){

        likeable.likes.pull(existingLike._id);
        likeable.save();

        existingLike.remove();
        deleted=true;
       }

       else{

        // make a new like

        let newLike=await Like.create({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        });
        likeable.likes.push(newLike._id);
        likeable.save();

       }

       return res.json(200,{
           message:'request successful',
           data:{
               deleted:deleted
           }
       });
       // if deleted is false then created
       // if deleted is true means the like exist snd existingLike holds value then delete the like
    }
    catch(err){

        console.log(err);
        return res.json(500,{

            message:"Internal server error "
        });

    }


}