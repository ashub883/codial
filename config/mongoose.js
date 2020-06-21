const mongoose=require('mongoose');
const env=require('./enviroment');

//mongoose.connect('mongodb://localhost/codial_deveplopment');

mongoose.connect(`mongodb://localhost/${env.db}`);
const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('connection established');
});

module.exports=db;