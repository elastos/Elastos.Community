import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import * as uuid from 'uuid'
import {validate, utilCrypto, mail} from '../utility';
import * as moment from 'moment';

const map_key = ['Kevin Zhang', 'Fay Li', 'Yipeng Su'];

let tm = null;

export default class extends Base {

    public async create(param): Promise<Document>{

        const db_cvote = this.getDBModel('CVote');

        if(!this.currentUser || !this.currentUser._id){
            throw 'invalid current user';
        }

        const {
            title, type, content, proposedBy, motionId, isConflict, notes, vote_map, reason_map
        } = param;
        const doc: any = {
            title, 
            type, 
            content,
            proposedBy,
            motionId,
            isConflict,
            notes,
            vote_map : this.param_metadata(vote_map),
            reason_map : this.param_metadata(reason_map),
            createdBy : this.currentUser._id
        };

        const vid = await this.getNewVid();
        doc.vid = vid;
        doc.status = this.getNewStatus(doc.vote_map, null);

        const cvote = await db_cvote.save(doc);

        this.sendEmailNotification(cvote, 'create');

        return cvote;
    }

    public async list(param): Promise<Document>{
        const db_cvote = this.getDBModel('CVote');
        const db_user = this.getDBModel('User');

        const query = {};
        const list = await db_cvote.list(query, {
            createdAt: -1
        }, 100);
        
        for(let item of list){
            if(item.createdBy){
                const u = await db_user.findOne({_id : item.createdBy});
                item.createdBy = u.username;
            }
            
        }

        return list;
    }
    public async update(param): Promise<Document>{
        const db_cvote = this.getDBModel('CVote');

        if(!this.currentUser || !this.currentUser._id){
            throw 'invalid current user';
        }

        const cur = await db_cvote.findOne({_id : param._id});
        if(!cur){
            throw 'invalid proposal id';
        }

        if(this.isExpired(cur) || _.includes([constant.CVOTE_STATUS.FINAL, constant.CVOTE_STATUS.DEFERRED], cur.status)){
            throw 'proposal finished or deferred, can not edit anymore';
        }

        const {
            title, type, content, proposedBy, motionId, isConflict, notes, vote_map, reason_map
        } = param;
        const doc: any= {
            title, 
            type, 
            content,
            proposedBy,
            motionId,
            isConflict,
            notes,
            vote_map : this.param_metadata(vote_map),
            reason_map : this.param_metadata(reason_map)
        };

        doc.status = this.getNewStatus(doc.vote_map, cur);

        const cvote = await db_cvote.update({_id : param._id}, doc);

        this.sendEmailNotification({_id : param._id}, 'update');
        
        return cvote;
    }

    public async finishById(id): Promise<any>{
        const db_cvote = this.getDBModel('CVote');
        const cur = await db_cvote.findOne({_id : id});
        if(!cur){
            throw 'invalid proposal id';
        }
        if(_.includes([constant.CVOTE_STATUS.FINAL], cur.status)){
            throw 'proposal already completed.';
        }

        const rs = await db_cvote.update({_id : id}, {
            $set : {
                status : constant.CVOTE_STATUS.FINAL
            }
        })

        return rs;
    }

    public async getById(id): Promise<any>{
        const db_cvote = this.getDBModel('CVote');
        const rs = await db_cvote.findOne({_id : id});
        return rs;
    }

    private param_metadata(meta: string){
        const rs = {};
        if(meta){
            const list = meta.split(',');

            _.each(list, (str)=>{
                const tmp = str.split('|');
                if(tmp.length === 2){
                    rs[tmp[0]] = tmp[1];
                }
            });
        }
        return rs;
    }

    public async getNewVid(){
        const db_cvote = this.getDBModel('CVote');
        const n = await db_cvote.count({});
        return n+1;
    }

    public getNewStatus(vote_map, data){
        let rs = constant.CVOTE_STATUS.PROPOSED;
        let ns = 0;
        let nf = 0;
        _.each(vote_map, (v)=>{
            if(v === 'support'){
                ns++;
            }
            else if(v === 'reject'){
                nf++;
            }
        });

        if(data && this.isExpired(data)){
            return constant.CVOTE_STATUS.DEFERRED;
        }

        if(nf > 1){
            rs = constant.CVOTE_STATUS.REJECT;
        }
        if(ns > 1){
            rs = constant.CVOTE_STATUS.ACTIVE;
        }
        

        return rs;
    }

    public isExpired(data): Boolean{
        const ct = moment(data.createdAt).valueOf();
        if(Date.now() - ct > constant.CVOTE_EXPIRATION){
            return true;
        }
        return false;
    }

    public async updateNote(param): Promise<Document>{
        const db_cvote = this.getDBModel('CVote');

        const cur = await db_cvote.findOne({_id : param._id});
        if(!cur){
            throw 'invalid proposal id';
        }
        if(this.currentUser.role !== constant.USER_ROLE.SECRETARY){
            throw 'only secretary could update notes';
        }

        const rs = await db_cvote.update({_id : param._id}, {
            $set : {
                notes : param.notes || ''
            }
        })

        return rs;
    }


    public async sendEmailNotification(data, updateOrCreate){
        // const list = [
        //     'kevinzhang@elastos.org',
        //     'suyipeng@elastos.org',
        //     'fay@elastos.org',
        //     'zhufeng@elastos.org'
        // ];

        // _.each(['liyangwood@aliyun.com'], async (address)=>{
        //     await mail.send({
        //         to : address,
        //         toName : 'Jacky.li',
        //         subject : 'CVote - Notification',
        //         body : `
        //             Proposal ${updateOrCreate}
        //             <br />
        //             please alick this link to get details.
        //             <a href="${process.env.SERVER_URL}/cvote/edit/${data._id}">${process.env.SERVER_URL}/cvote/edit/${data._id}</a>
        //         `
        //     });
        // });
    }

    private async eachJob(){
        const db_cvote = this.getDBModel('CVote');

        const list = await db_cvote.find({
            'status' : {
                '$in' : [constant.CVOTE_STATUS.PROPOSED]
            }
        });
        const ids = [];
        console.log(ids);
        _.each(list, (item)=>{
            if(this.isExpired(item)){
                ids.push(item._id);
            }
        });

        await db_cvote.update({_id : {
            $in : ids
        }}, {
            status : constant.CVOTE_STATUS.DEFERRED
        });

    }

    public cronjob(){
        if(tm){
            return false;
        }
        tm = setInterval(()=>{
            console.log('---------------- start cvote cronjob -------------');
            this.eachJob();
        }, 1000*60);
    }
}
