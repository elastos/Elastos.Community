declare var describe, test, expect, require, process;

import * as Session from 'express-session';

import db from '../../db';
import '../../config';
import UserService from '../UserService';

describe('Tests for User', () => {

    test('Should create user', async () => {

        let DB = await db.create();

        let userService = new UserService(DB, {
            user: 'test'
        });

        let timeMs = new Date().valueOf();

        let result = await userService.registerNewUser({
            username: `clarence+dev.test.${timeMs}@elastosjs.com`,
            password: 'elastos450',
            profile: {
                name: 'Clarence',
                email: 'clarence+dev.test@elastosjs.com',
                region: {
                    country: 'Canada',
                    city: 'Vancouver'
                }
            }
        });

        expect(result.role).to.be.equal('member')

    })

});
