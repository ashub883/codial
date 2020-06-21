const mongoose=require('mongoose');
//we are importing multer in user not in config folder because we are uploading file specific to user and we have to made user specific setting
// we are using multer module as module speific but we can also make a centralised multer
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars')
const userschema=new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
         required:true

    },
    name:{
        type:String,
        required:true
    },
    avatar:{
      type:String
    }
},
     {
        timestamps:true
    });


    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null,path.join(__dirname,'..',AVATAR_PATH));
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())
        }
      })

      //static functions
      
        // Here multer will diskstorage in storage key of multer object(storage key will furthur store obect which contain two keys dest and file mame )
          //single means only file will be uploaded for field avatar 
      userschema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');

      userschema.statics.avatarPath=AVATAR_PATH;


      const User=mongoose.model('User',userschema);

    module.exports=User;