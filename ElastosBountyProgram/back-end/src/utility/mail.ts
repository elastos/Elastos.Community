import * as Mailgun from 'mailgun-js'
import * as _ from 'lodash'

export default {

    /**
     *
     * @param {any} to
     * @param {any} toName
     * @param {any} subject
     * @param {any} body
     * @param {any} replyTo - {name, email}
     * @returns {Promise<any>}
     */
    async send(options) {

        const {to, toName, subject, body, replyTo} = options

        const mailgun = Mailgun({
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_URL
        })

        const data:any = {
            from: 'Cyber Republic - Elastos <no-reply@elastosjs.com>',
            to: `${toName} <${to}>`,
            subject: subject,
            html: body
        };

        if (replyTo && !_.isEmpty(replyTo)) {
            data['h:Reply-To'] = `${replyTo.name} <${replyTo.email}>`
        }

        return new Promise((resolve, reject) => {

            resolve()

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

