const nodemailer=require("nodemailer");
process("dotenv").config();

const mailSender=async(email,title,body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            autj:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info=transporter.sendMail({
            from:"STUDYNOTION||by-Madhur",
            to:email,
            subject:title,
            htmp:`<p>${body}</p>`

        })

    }
    catch(error){
        console.log(error);
    }
}

module.exports=mailSender;

