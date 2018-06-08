declare var describe, test, expect, require, process;

import mail from '../mail';

test('sendMail method', ()=>{


    mail.sendMail({
        to: 'clarence@elastosjs.com',
        toName: 'Clarence Liu',
        subject: 'Test',
        body: 'Hello world'
    })
});
