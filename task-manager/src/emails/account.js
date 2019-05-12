const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

// Welcome email
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'task-manager@company.com',
        subject: 'Thanks for joining us !',
        text: `Welcome to the task manager app, ${name} ! Let us know how you feel about our app.`
    })
}

// Cancelation email
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'task-manager@company.com',
        subject: 'Sorry to ear you go !',
        text: `We are sorry that you are quitting your app, ${name}. Tell us why you did go away.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}