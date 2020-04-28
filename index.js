const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const expesslayout=require('express-ejs-layouts');


// express session is used to encrypt userid and store in a session cookie
const session=require('express-session');

const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


// connect mongo is used to  store session cookie permanently even if server restarts
const MongoStore=require('connect-mongo')(session);

//middleware
const sassMiddleware=require('node-sass-middleware');


app.use(sassMiddleware({
   src:'./assets/scss',
   dest:'./assets/css',
   debug:true,
   outputStyle:'extended',
   prefix:'/css'

}));

//middleware
app.use(express.urlencoded());

app.use(cookieParser());



app.use(express.static('./assets'));

app.use(expesslayout);

//extract styles and scripts from sub pages  and put into layouts(in right place means style tag placed in header)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');


app.use(session({

  name:'codial',
// to do change the secret before deployement in production mode
  secret:'something',

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

app.use('/',require('./routes/index'));

app.listen(port,function(err)
{
  if(err)
  {
      console.log(`Error in finding port:${err}`);
  }

   console.log(port);
});