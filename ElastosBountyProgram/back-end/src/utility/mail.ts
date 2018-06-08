import * as Mailgun from 'mailgun-js'

export default {
    async send({to, toName, subject, body}) {

        const mailgun = Mailgun({
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_URL
        })

        const data = {
            from: 'Elastos Temp <no-reply@elastosjs.com>',
            to: `${toName} <${to}>`,
            subject: subject,
            html: body
        };

        return new Promise((resolve, reject) => {
            mailgun.messages().send(data, function (err, body) {
                if (err) {
                    console.error(err);
                    reject(err)
                    return
                }
                // console.log(body);
                resolve()
            });
        })

    }
}

