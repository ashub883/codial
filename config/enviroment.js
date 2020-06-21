
const fs=require('fs');
const rfs=require('rotating-file-stream')
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');

// if the file doesn't exist then it create it

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// accessLogStream means logs coming how user is accessing my website 

const accessLogStream= rfs.createStream('access.log',{

    interval:'1d',
    path:logDirectory

});
// to import this inti enviroment we write above logic into dev and prod both mode

const development={
    name:'Development',
    asset_path:'./assets',
    session_cookie_key:'something',
    db:'codial_deveplopment',
    smtp:{
    
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
        
                user:'ashubajpai883@gmail.com',
                pass:'11111122Ashu'
        
            }
    },
    google_client_ID:"410449759406-90kaj9771jabfh6adokeirj6se8q6d8m.apps.googleusercontent.com",
    google_client_Secret:"pyhR5mVLxhJdVi8L1wuj_Puc",
    google_callback_URL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret_key:'codial',
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream}
    }

    }


const production={
    name:'Production',
    asset_path:process.env.Codial_Asset_Path,
    session_cookie_key:process.env.Codial_Session_Cookie_Key,
    db:process.env.Codial_Db,
    smtp:{
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
        
                user:process.env.Codial_User,
                pass:process.env.Codial_Pass
        
            }
    },
    google_client_ID:process.env.Codial_Goggle_Client_Id,
    google_client_Secret:process.env.Codial_Goggle_Client_Secret,
    google_callback_URL:process.env.Codial_Google_Callback_Url,
    jwt_secret_key:process.env.Codial_Jwt_Secret_Key,
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream}
    }


}

//module.exports=development;
// eval will evaluate a value kept in a string as a expression
// for ex if there is "production" then it evaluate production as a variable and takes its value

//module.exports=eval(process.env.Codial_Enviroment)==undefined ? development : eval(process.env.Codial_Enviroment);

module.exports=development;


