const nodemailer=require('../config/nodemailer');


exports.newComment=(comment)=>{

    console.log('inside new comment mailer',comment);

    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({

        from:'ashu@gmail.com',
        to:comment.user.email,
        subject:'new comment published',
        html:'<h1> Your comment is now published</h1>'
    },(err,info)=>{

        if(err){ console.log('email not sent',err); return;}

        //console.log('message sent',info);
        return;
    }

    
    )

}
