import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto} from '../utility';
import UserService from "./UserService";

export default class extends Base {

    /**
     * This also handles creating sub tasks, if it's sub task
     * the parentTaskId must be set, and the user must be owner of the parent task
     *
     * Also check that the ELA reward is less than the parent task reward (v1.5)
     *
     * @param param
     * @returns {Promise<"mongoose".Document>}
     */
    public async create(param): Promise<Document> {
        const {name, description, communityId, type, startTime, endTime, candidateLimit, reward_ela, reward_votePower} = param;
        this.validate_name(name);
        this.validate_description(description);
        this.validate_type(type);
        this.validate_reward_ela(reward_ela);
        this.validate_reward_votePower(reward_votePower);

        const doc = {
            name, description, type,
            startTime,
            endTime,
            candidateLimit,
            reward : {
                ela : {
                    amount : reward_ela
                },
                votePower : {
                    amount : reward_votePower
                }
            },
            createdBy : this.currentUser._id
        };
        if(communityId){
            doc['communityId'] = communityId;
        }

        // if member role, could not create
        const role = this.currentUser.role;
        if(role === constant.USER_ROLE.MEMBER){
            throw 'member could not create task';
        }

        if(type === constant.TASK_TYPE.EVENT){
            const userService = this.getService(UserService);
            if(reward_ela > userService.getSumElaBudget(this.currentUser.elaBudget)){
                throw 'ela reward could not greater than user budget';
            }
        }

        const db_task = this.getDBModel('Task');

        console.log('create task => ', doc);
        return await db_task.save(doc);
    }

    /**
     * Changing a task's reward/upfront after approval is only allowed by admins/council
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async update(param): Promise<boolean> {
        const {id, name, description, communityId, type, startTime, endTime, candidateLimit, reward_ela, reward_votePower} = param;
        this.validate_name(name);
        this.validate_description(description);
        this.validate_type(type);
        this.validate_reward_ela(reward_ela);
        this.validate_reward_votePower(reward_votePower);


        return true;
    }

    /**
     * We should only ever set deleted flag
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async remove(param): Promise<boolean> {
        return true;
    }

    /**
     * Only an admin/council role may approve the task
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async approve(param): Promise<boolean> {
        return true;
    }

    public async addCandidate(param): Promise<boolean> {
        return true;
    }

    /**
     * You can either be the candidate or the task owner, or admin/council
     * @param param
     * @returns {Promise<boolean>}
     */
    public async removeCandidate(param): Promise<boolean> {
        return true;
    }

    /**
     * @param param {Object}
     * @param param.id {String}
     * @returns {Promise<boolean>}
     */
    public async approveCandidate(param): Promise<boolean> {
        return true;
    }

    public async rejectCandidate(param): Promise<boolean> {
        return true;
    }


    public validate_name(name){
        if(!validate.valid_string(name, 4)){
            throw 'invalid task name';
        }
    }
    public validate_description(description){
        if(!validate.valid_string(description, 1)){
            throw 'invalid task description';
        }
    }
    public validate_type(type){
        if(!type){
            throw 'task type is empty';
        }
        if(!_.includes(constant.TASK_TYPE, type)){
            throw 'task type is not valid';
        }
    }

    public validate_reward_ela(ela){
        // TODO check current user has enough ela or not.
    }
    public validate_reward_votePower(votePower){
        // TODO check current user has enough votePower or not.
    }


}
