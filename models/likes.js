const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({

    user:{

        type:mongoose.Schema.ObjectId
          //type:mongoose.Schema.Types.ObjectId
    },
    // this defnes the object id of the liked object
    likeable:{

        type:mongoose.Schema.ObjectId,
       //type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'onModel'

    },
    // this field is used for defining the type of the linked object since it is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},
   {
       timestamps:true
   }
);

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;