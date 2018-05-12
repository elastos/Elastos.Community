import {Request, Response, NextFunction, Router} from 'express';
import {getEnv} from '../utility';
import db from '../db';
import {crypto} from '../utility';
import * as moment from 'moment';

import test from './test';
import user from './user';


export const middleware = (req: Request, res: Response, next: NextFunction)=>{
    // check token
    const token = req.headers['api-token'];
    if(token){
        try{
            const json = JSON.parse(crypto.decrypt(token.toString()));
            if(json.userId && json.expired && (json.expired - moment().unix() > 0)){
                db.create().then((DB)=>{
                    DB.getModel('User').findOne({_id: json.userId}).then((user)=>{
                        if(user){
                            req['session'].user = user;
                        }

                        next();
                    }).catch(()=>{
                        next();
                    })
                });
                return false;
            }
        }catch(e){
            next();
        }
    }
    else if(req['session'].userId){
        // check session
        const session = req['session'];
        db.create().then((DB)=>{
            DB.getModel('User').findOne({_id: session.userId}).then((user)=>{
                if(user){
                    req['session'].user = user;
                }

                next();
            }).catch(()=>{
                next();
            })
        });
        return false;
    }


    next();
};

const router = Router();

if(getEnv() === 'dev'){
    router.use('/test', test);
}

router.use('/user', user);

export default router;
