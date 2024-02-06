require('dotenv').config()

const nodemailer = require('nodemailer')
const Mailgen = require('mailgen');

/** send mail from real gmail account */
    // const user = this
    // const userEmail = user.email
    // const uname = user.name
    // const { userEmail } = req.body;

const sendmail = async (req, res) => {
    
    /** send mail from real gmail account */
    // const { email } = req.body;
    // const userEmail= email

    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })
    let response = {
        body: {
            name : "Node js Api",
            intro: "You Just Sign Up!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }
    let mail = MailGenerator.generate(response)

    let message = {
        from : process.env.EMAIL,
        // to : userEmail,
        to : 'sagole5328@fitwl.com',
        subject: "Click Here",
        html: mail
    }
    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("send mail Successfully...!");
}

module.exports = sendmail