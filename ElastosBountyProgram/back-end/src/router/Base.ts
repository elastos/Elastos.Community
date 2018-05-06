import {Response, Request, Router} from 'express';
import * as Session from 'express-session';
// import Service from '../model/Service';
import * as _ from 'lodash';

interface RESULT {
    code: number,
    data?: any,
    error?: Error,
    message?: string
}

interface ROUTEING {
    path: string;
    router: any;
    method: string;
}

export default abstract class {
    static setRouter(list: ROUTEING[]): Router{
        const router = Router();
        _.each(list, (item)=>{
            router[item.method](item.path, (req, res)=>{
                const c = new item.router(req, res);
                return c.main();
            });
        });
        return router;
    }


    protected req: Request;
    protected res: Response;
    protected session: Session;

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.session = req.session;
        this.init();
    }

    protected init(){}

    public async main(): Promise<any> {
        try{
            if(!await this.validate()){
                return false;
            }

            const result = await this.action();
            if(result){
                this.res.set('Content-Type', 'application/json');
                this.res.json(result);
            }

        }catch(e){
            this.res.json(this.result(-1000, e));
        }
    }

    private async validate(){
        // TODO
        return true;
    }

    // need to override
    abstract async action();

    protected result(code, dataOrError, msg?){
        const opts: RESULT = {
            code,
            data: dataOrError,
            error : dataOrError,
            message : msg
        };
        if(opts.code > 0){
            return {
                code : opts.code,
                data : opts.data,
                message : opts.message || 'ok'
            };
        }
        else{
            const err = opts.error;
            return {
                code : opts.code,
                error : err.message || err.toString()
            };
        }

    }

    /*
    * get service
    * */
    // protected buildService<T extends Service>(service: { new(...args): T }): T{
    //     return new service(this.db, this.config, this.req);
    // }

    protected getParam(key?: string): any{
        const param = _.extend({}, this.req.query, this.req.params);
        return key ? _.get(param, key, null) : param;
    }

};
