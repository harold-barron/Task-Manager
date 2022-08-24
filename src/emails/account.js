const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENGRID_API_KEY)

class sendEmail{
 static sendWelcomeEmail = (email,name) =>{
    sgMail.send({
        to: email,
        from:'haroldbarron13@gmail.com',
        subject: 'Thanks for use the task app!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
    }
    static sendGoodbayEmail = (email,name) =>{
        sgMail.send({
            to: email,
            from:'haroldbarron13@gmail.com',
            subject: 'We are so sorry for your leaving!',
            text: `Hi! ${name}. We are so sorry for you this situation. Let me know if there is anything tath we can do for your.`
        })
        }
}

module.exports = sendEmail