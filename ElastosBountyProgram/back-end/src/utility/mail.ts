import * as Mailgun from 'mailgun-js'

export default {
    sendMail({to, toName, subject, body}) {

        debugger
        const mailgun = Mailgun({
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_URL
        })

        const data = {
            from: 'Elastos Temp <no-reply@elastosjs.com>',
            to: `${toName} <${to}>`,
            subject: subject,
            text: body
        };

        mailgun.messages().send(data, function (err, body) {
            if (err) {
                console.error(err);
                return
            }
            console.log(body);
        });

    }
}

