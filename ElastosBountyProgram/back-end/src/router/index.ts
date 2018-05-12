import {Request, Response, NextFunction, Router} from 'express';
import {getEnv} from '../utility';
import db from '../db';

import test from './test';
import user from './user';


export const middleware = (req: Request, res: Response, next: NextFunction)=>{

    // check session
    const session = req['session'];
    if(session.userId){
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
