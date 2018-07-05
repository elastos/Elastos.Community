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
    let ts_admin: TaskService, task:any;

    test('prepare test', async ()=>{
        // add a task
        ts_admin = new TaskService(DB, {
            user : user.admin
        });
        task = await ts_admin.create(global.DB.TASK_1);

        // add 1 more member
        // const userService = new UserService(DB, {
        //     user: user.admin
        // });
        // const m1: any = await userService.registerNewUser({
        //     ...global.DB.MEMBER_USER,
        //     username: 'aaa'
        // });
    });



    test('should create task success as admin user', async ()=>{
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
        const taskService = new TaskService(DB, {
            user : user.admin
        });

        await expect(taskService.create(global.DB.TASK_2)).rejects.toThrowError(/budget/);
    });

    test('Should create event with status SUCCESS because reward + upfront is under budget limit', async () => {

        // TODO: make sure the elaBudget is deducted from and there is a transaction log
    })

    test('Should create event with status SUCCESS because there is no upfront/reward and limit is 0', async () => {

        // expect user budget to be 0

        // TODO: make sure the elaBudget is deducted from and there is a transaction log
    })

    test('member should apply to be a task candidate', async () => {
        const taskService = new TaskService(DB, {
            user : user.member
        });

        const rs: any = await taskService.addCandidate({
            taskId: task._id,
            userId: user.member._id
        });

        expect(rs.status).toBe('PENDING');
    });

    test('Should allow removing candidate from task if you are the candidate', async () => {
        const task = await ts_admin.create({
            ...global.DB.TASK_1,
            name : 'task_111'
        });

        const ts1 = new TaskService(DB, {user: user.member});
        await ts1.addCandidate({
            taskId: task._id,
            userId: user.member._id
        });

        const rs: any = await ts1.removeCandidate({
            taskId: task._id,
            userId: user.member._id
        });
        expect(rs.ok).toBe(1);
    })

    test('Should allow removing candidate from task if you are the task owner (leader)', async () => {
        // task owner must be admin for now.
        // same to next test
    })

    test('Should allow removing candidate from task if you are an admin/council', async () => {
        const task = await ts_admin.create({
            ...global.DB.TASK_1,
            name : 'task_222'
        });

        const ts1 = new TaskService(DB, {user: user.member});
        await ts1.addCandidate({
            taskId: task._id,
            userId: user.member._id
        });

        const rs: any = await ts_admin.removeCandidate({
            taskId: task._id,
            userId: user.member._id
        });
        expect(rs.ok).toBe(1);
    });

    test('only admin and council could approve a task', async () => {
        const taskService = new TaskService(DB, {
            user : user.admin
        });

        const task: any = await taskService.create(global.DB.TASK_1);

        let rs: any = await taskService.approve({id : task._id});
        expect(rs.ok).toBe(1);

        const ts1 = new TaskService(DB, {user : user.member});
        // member role could not approve
        await expect(ts1.approve({id : task._id})).rejects.toThrow();
    });

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

    test('Approval should send an email to owner + all admins too', async () => {
        // TODO
    })
});
