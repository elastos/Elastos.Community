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

    }

    /**
     * Only the admin/leader can change certain fields like the status to SENT
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async update(param): Promise<boolean> {

    }

    public async index(param): Promise<[Document]> {

    }

    public async addMember(param): Promise<boolean> {

    }

    public async removeMember(param): Promise<boolean> {

    }
}
