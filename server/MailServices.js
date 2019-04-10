require('dotenv').config()
const request = require("request");
const MAX_TRIES = 2

function sendMail_mailgun(mail, count, callback) {
    if (count > MAX_TRIES) {
        return callback(`Mail failed after ${MAX_TRIES} tries`)
    }
    var options = {
        method: 'POST',
        url: `https://api:${process.env.MALIGUN_KEY}@api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
        headers:
        {
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data;'
        },
        formData:
        {
            from: mail.from,
            to: mail.to.split(','),
            subject: 'Mail gun: ' + mail.subject,
            text: mail.text
        }
    };

    request(options, function (error, response, body) {
        if (error || body === 'Forbidden') {
            console.log('Mailgun failed', count)
            return sendMail_sendgrid(mail, ++count, callback)
        }
        callback(null, body)
        console.log('Mailgun success', body);
    });
}

function sendMail_sendgrid(mail, count, callback) {
    if (count > MAX_TRIES) {
        return callback(`Mail failed after ${MAX_TRIES} tries`)
    }
    const personalizations = mail.to.split(',').map(email => ({
        to: [{ email }]
    }))
    var options = {
        method: 'POST',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers:
        {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SENDGRID_KEY}`
        },
        body:
        {
            personalizations,
            from: { email: mail.from },
            subject: 'Send grid: ' + mail.subject,
            content: [{ type: 'text/plain', value: mail.text }]
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error || body) {
            console.log('Sendgrid failed', count, body.errors)
            return sendMail_mailgun(mail, ++count, callback)
        }
        callback(null, body)

        console.log('Sendgrid success', body); // undefined
    });
}

module.exports = {
    sendMail_mailgun,
    sendMail_sendgrid
}