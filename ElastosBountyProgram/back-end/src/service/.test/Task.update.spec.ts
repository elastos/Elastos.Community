declare var global, describe, test, expect, assert, require, process, beforeAll, afterAll, sinon

const sinon = require('sinon')

import db from '../../db'
import '../../config'

import {mail} from '../../utility'

import UserService from '../UserService'
import TaskService from '../TaskService'

const testData: any = {}
let DB, taskServiceMember, taskServiceOrganizer, taskServiceAdmin, mailMethod

import {constant} from '../../constant';

/**
 * global.DB is declared in test/unit/setup.js
 */
beforeAll(async ()=>{
    DB = await db.create()

    // stub mail
    mailMethod = sinon.stub(mail, 'send', (options) => {
        return Promise.resolve();
    });

    // remove test user
    await DB.getModel('User').remove({
        username: global.DB.MEMBER_USER.username
    });
    await DB.getModel('User').remove({
        username: global.DB.ORGANIZER_USER.username
    });

    // create a test user as member role
    const userService = new UserService(DB, {
        user: null
    })
    testData.organizer = await userService.registerNewUser(global.DB.ORGANIZER_USER)
    testData.admin = await userService.getDBModel('User').findOne(global.DB.ADMIN_USER)

    // set member to organizer
    await userService.getDBModel('User').update({_id: testData.organizer._id}, {role: 'LEADER'})

    testData.organizer = await userService.getDBModel('User').findOne({username: global.DB.ORGANIZER_USER.username})

    // create social task
    taskServiceOrganizer = new TaskService(DB, {
        user: testData.organizer
    })

    testData.taskSocialEvent = await taskServiceOrganizer.create(global.DB.TASK_1)

    // initialize this
    taskServiceAdmin = new TaskService(DB, {
        user: testData.admin
    })

    testData.member = await userService.registerNewUser(global.DB.MEMBER_USER)
})

describe('Tests for Task Update', () => {

    test('Make sure task is initially PENDING', async () => {
        expect(testData.taskSocialEvent.status).toBe(constant.TASK_STATUS.PENDING)
    })

    test('Make sure only admin can set to APPROVED', async () => {
        await taskServiceMember.update({
            taskId: testData.taskSocialEvent._id,
            status: constant.TASK_STATUS.APPROVED
        })

        testData.taskSocialEvent = await DB.getModel('Task').findOne({
            _id: testData.taskSocialEvent._id
        })

        expect(testData.taskSocialEvent.status).toBe(constant.TASK_STATUS.PENDING)

        await taskServiceOrganizer.update({
            taskId: testData.taskSocialEvent._id,
            status: constant.TASK_STATUS.APPROVED
        })

        testData.taskSocialEvent = await DB.getModel('Task').findOne({
            _id: testData.taskSocialEvent._id
        })

        expect(testData.taskSocialEvent.status).toBe(constant.TASK_STATUS.PENDING)

        await taskServiceAdmin.update({
            taskId: testData.taskSocialEvent._id,
            status: constant.TASK_STATUS.APPROVED
        })

        testData.taskSocialEvent = await DB.getModel('Task').findOne({
            _id: testData.taskSocialEvent._id
        })

        expect(testData.taskSocialEvent.status).toBe(constant.TASK_STATUS.APPROVED)
    })

    test('Both organizer/leader can set to ASSIGNED', async () => {

    })

})

afterAll(async () => {
    // remove test task
    await DB.getModel('Task').remove({
        _id: testData.taskSocialEvent._id
    });
})
