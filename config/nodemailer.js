const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./enviroment');

let transporter=nodemailer.createTransport(env.smtp);

let renderTemplate=(data,relativePath)=>{

    // relative path is the path from where mail is to be sent

    // main html has what html we are send in that mail
    let mainHTML;

    // ejs is to render template and send it
    ejs.renderFile(

        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function (err,template) {
            
            if(err){ console.log('error',err); return; }

            mainHTML=template;
        })
        return mainHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
