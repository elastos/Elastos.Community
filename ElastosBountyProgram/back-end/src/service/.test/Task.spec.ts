declare var global, describe, test, expect, assert, require, process, beforeAll, afterAll;

import db from '../../db';
import '../../config';
import UserService from '../UserService';
import TaskService from '../TaskService';

const user: any = {};
let DB;
beforeAll(async ()=>{
    DB = await db.create();
    await DB.getModel('User').remove({
        role : 'MEMBER'
    });
    await DB.getModel('Task').remove({});

    // create a test user as member role
    const userService = new UserService(DB, {
        user: null
    });
    user.member = await userService.registerNewUser(global.DB.MEMBER_USER);
    user.admin = await userService.getDBModel('User').findOne(global.DB.ADMIN_USER);
});

describe('Tests for Tasks', () => {

    test('should create task success as admin user', async ()=>{
        const taskService = new TaskService(DB, {
            user : user.admin
        });

        const task: any = await taskService.create(global.DB.TASK_1);
        expect(task.createdBy).toBe(user.admin._id);
    });

    test('Should create task and fail because user is member role only', async () => {
        const taskService = new TaskService(DB, {
            user : user.member
        });

        // create task will fail
        await expect(taskService.create(global.DB.TASK_1)).rejects.toThrowError(/member/);
    });

    test('Should create event and fail because reward is over user budget limit', async () => {

    })

    test('Should create event with status SUCCESS because reward + upfront is under budget limit', async () => {

        // TODO: make sure the elaBudget is deducted from and there is a transaction log
    })

    test('Should create event with status SUCCESS because there is no upfront/reward and limit is 0', async () => {

        // expect user budget to be 0

        // TODO: make sure the elaBudget is deducted from and there is a transaction log
    })

    test('Should allow adding candidate to a task', async () => {

    })

    test('Should allow removing candidate from task if you are the candidate', async () => {

    })

    test('Should allow removing candidate from task if you are the task owner (leader)', async () => {

        // this needs to be logged
    })

    test('Should allow removing candidate from task if you are an admin/council', async () => {

        // this needs to be logged
    })

    test('Should try to approve event but fail because user is only a leader', async () => {

    })

    test('Should approve event with upfront over budget and create an ELA owed transaction', async () => {
        // expect user to be admin/council
    })

    test('Should veto task proposal as council', async () => {
        // expect user to be council
    })

    test('Should set task to SUCCESS as admin/council', async () => {
        // expect user to be admin/council

        // expect ELA transactions for task & all sub-tasks to be logged

        // expect EVP to be logged for all allocations
    })
});
