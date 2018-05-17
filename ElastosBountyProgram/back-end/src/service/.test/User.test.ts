declare var describe, test, expect, require, process;

import {expect} from 'chai'

import {constant} from '../../constant';
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
            password: 'elastos821',
            email: 'clarence+dev.test@elastosjs.com',
            profile: {
                firstName: 'Clarence',
                lastName: 'Liu',
                region: {
                    country: 'Canada',
                    city: 'Vancouver'
                }
            }
        });

        expect(result.role).to.be.equal(constant.USER_ROLE.MEMBER)

    })

});
