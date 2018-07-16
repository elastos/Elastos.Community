declare var describe, test, expect, require, process;

import {expect, assert} from 'chai'

import {constant} from '../../constant';
import db from '../../db';
import '../../config';
import UserService from '../UserService';


let DB, userService

const _generateMember = (uid) => {
    let timeMs = new Date().valueOf()
    return {
        username: `clarence+dev.test.${timeMs}.${uid}@elastosjs.com`,
        password: 'elastos821',
        email: `clarence+dev.test.${timeMs}.${uid}@elastosjs.com`,
        firstName: 'Clarence',
        lastName: 'Liu',
        country: 'ca',
        city: 'Vancouver'
    }
}

const member = _generateMember('1')
const anotherMember = _generateMember('2')

let result, resultAnother

describe('Tests for User', () => {
    beforeAll(async () => {
        DB = await db.create();

        userService = new UserService(DB, {
            user: 'test'
        });
    })

    test('It should register new users as members', async () => {
        result = await userService.registerNewUser(member);
        expect(result.role).to.be.equal(constant.USER_ROLE.MEMBER)
        resultAnother = await userService.registerNewUser(anotherMember);
        expect(resultAnother.role).to.be.equal(constant.USER_ROLE.MEMBER)
    })

    test('It should not be possible to change other users email', async () => {
        const expectedError = 'Access Denied'

        try {
            await userService.update({
                userId: resultAnother._id,
                email: 'foo@bar.com'
            })

            assert.fail(`Should fail with ${expectedError}`)
        } catch (err) {
            expect(err).to.be.equal(expectedError)
        }
    })

    test('It should not be possible to change other users password', async () => {
        const expectedError = 'Access Denied'

        try {
            await userService.changePassword({
                username: anotherMember.username,
                oldPassword: anotherMember.password,
                password: 'elastos832'
            })

            assert.fail(`Should fail with ${expectedError}`)
        } catch (err) {
            expect(err).to.be.equal(expectedError)
        }
    })

    afterAll(async () => {
        await DB.disconnect()
    })
});
