const express=require('express');
const env=require('./config/enviroment');

// it is used to stoe the logs in production 
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const expesslayout=require('express-ejs-layouts');


// express session is used to encrypt userid and store in a session cookie
const session=require('express-session');

const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const passportJwt=require('./config/passport-jwt-strategy');


const googleStrategy=require('./config/passport-google-oauth2-strategy');

const nodemailer=require('./config/nodemailer');

const queue=require('./config/kue');
const kue=require('kue');
// connect mongo is used to  store session cookie permanently even if server restarts
const MongoStore=require('connect-mongo')(session);

//middleware
const sassMiddleware=require('node-sass-middleware');

const flash=require('connect-flash');

const customMware=require('./config/middleware');

// we have to use a inbuilt module hhtp which have app passed to it which is a express app
// setting up a chat server to be used with socket .io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path=require('path');

if(env.name=='development'){
app.use(sassMiddleware({
   src:path.join(__dirname,env.asset_path,'/scss'),
   dest:path.join(__dirname,env.asset_path,'/css'),
   debug:true,
   outputStyle:'extended',
   prefix:'/css'

}));

}
//middleware
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());



app.use(express.static(env.asset_path));

console.log(env.asset_path);

// make the upload path available to the browser 
app.use('/uploads',express.static(__dirname + '/uploads'));


//app.use(logger(env.morgan.mode, env.morgan.options));

app.use(logger(env.morgan.mode ,env.morgan.options));


app.use(expesslayout);

//extract styles and scripts from sub pages  and put into layouts(in right place means style tag placed in header)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({

  name:'codial',
// to do change the secret before deployement in production mode
  secret:env.session_cookie_key,

  //if user the is not logged a their is no key generated then we want to store extra info. in session cookie,no thtat's why false

  saveUninitialized:false,
  // when the indentity of user is establish and data is present in session cookie and we can rewrite data in session if it not changed / that' why it's false
  
  resave: false,
  cookie:{

    maxAge:(1000*60*100)
  },
  store: new MongoStore(
    {
      mongooseConnection:db,
      autoRemove:'disabled'
    },
    function(err){
      console.log(err,'error in connecting to db')
    }
  )
    
}));

app.use(passport.initialize());

//passport helps to maintain session 
app.use(passport.session());

// app use  this function becoz if session cookie is present then user value is copied  in locals and users is accesible in views
app.use(passport.setAuthenticatedUser);

// it is used after session is being used because it use session cookie ,so it is setup in cookies which use session information
app.use(flash());

// we are using the middleware
app.use(customMware.setFlash);

app.use('/',require('./routes/index'));

app.listen(port,function(err)
{
  if(err)
  {
      console.log(`Error in finding port:${err}`);
  }

   console.log(port);
});