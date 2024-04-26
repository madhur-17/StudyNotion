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
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
            

        })

    }
    catch(error){
        console.log(error);
    }
}

module.exports=mailSender;

