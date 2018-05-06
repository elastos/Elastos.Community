import {Request, Response, NextFunction, Router} from 'express';
import {getEnv} from '../utility';

import test from './test';
import user from './user';


export const middleware = (req: Request, res: Response, next: NextFunction)=>{
    // TODO add middleware if needed
    const session = req['session'];
    console.log(111, session);

    next();
};

const router = Router();

if(getEnv() === 'dev'){
    router.use('/test', test);
}

router.use('/user', user);

export default router;
