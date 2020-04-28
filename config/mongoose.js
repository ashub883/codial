const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codial_deveplopment');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('connection established');
});

module.exports=db;