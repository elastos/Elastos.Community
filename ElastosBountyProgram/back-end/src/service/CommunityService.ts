import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto} from '../utility';

export default class extends Base {

    /**
     * Create a Community, you can nest them under other communities,
     * each community can have a leader
     *
     * @param param
     * @returns {Promise<"mongoose".Document>}
     */
    public async create(param): Promise<Document> {
        const db_community = this.getDBModel('Community');

        // validate
        this.validate_name(param.name);
        const {name, parentCommunityId, geolocation, type, leaderId} = param;

        const doc = {
            name,
            parentCommunityId,
            geolocation,
            type,
            leaderId,
            createdBy : this.currentUser._id
        };

        return await db_community.save(doc);
    }

    /**
     * Only the admin/leader can change certain fields like the status to SENT
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async update(param): Promise<boolean> {
        const db_community = this.getDBModel('Community');

        //validate
        this.validate_name(param.name);
        const {communityId, name, parentCommunityId, geolocation, type, leaderId} = param;

        const doc = {
            $set : {
                name,
                parentCommunityId,
                geolocation,
                type,
                leaderId
            }
        };

        return await db_community.update({_id : communityId}, doc);
    }

    /**
     * Get list Community
     *
     * @param param skip, limit: number query, sort: object
     * @returns {Promise<"mongoose".Document>}
     */
    public async index(param): Promise<[Document]> {
        const {query} = param;
        const db_community = this.getDBModel('Community');

        return await db_community.find(query);
    }

    /**
     * Get list member
     *
     * @param param
     * @returns {Promise<"mongoose".Document>}
     */
    public async listMember(param): Promise<Document[]>{
        const {communityId} = param;
        const db_user_community = this.getDBModel('User_Community');

        return await db_user_community.find({communityId});
    }

    /**
     * Add member to Community
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async addMember(param): Promise<boolean> {
        const {userId, communityId} = param;

        const db_user_community = this.getDBModel('User_Community');
        const tmp = await db_user_community.findOne({
            userId: userId,
            communityId: communityId
        });

        if (tmp) {
            throw 'user is exist';
        }

        await db_user_community.save({
            userId,
            communityId
        });

        return true;
    }

    /**
     * Remove member out Community
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async removeMember(param): Promise<boolean> {
        const {userId, communityId} = param;

        const db_user_community = this.getDBModel('User_Community');
        const tmp = await db_user_community.findOne({
            userId,
            communityId
        });
        if (!tmp) {
            throw 'user is not exist';
        }

        await db_user_community.findOneAndDelete({
            userId: userId,
            communityId: communityId
        });

        return true;
    }

    public validate_name(name){
        if(!validate.valid_string(name, 2)){
            throw 'invalid community name';
        }
    }
}
