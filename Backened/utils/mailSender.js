const nodemailer=require("nodemailer");
const path=require("path");

const mailSender=async(email,title,body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info=transporter.sendMail({
            from:{
                name:"StudyNotion",
                address:process.env.MAIL_USER,
            },
            to:email,
            subject:title,
            htmp:`${body}`,
            attachments:[{
                filename:"StudyNotion",
                path:path.join(__dirname,"Logo-Full-Light.png"),
                contentType:'image/png'
            }]

        })

    }
    catch(error){
        console.log(error);
    }
}

module.exports=mailSender;

