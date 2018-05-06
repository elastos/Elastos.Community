import * as mongoose from 'mongoose';
import Test from './Test';

export default class {
    protected db: any;
    public connection: mongoose.ConnectionBase;

    constructor(){
        this.db = {};
    }

    public isConnected(): boolean{
        return this.connection && this.connection.readyState === 1;
    }

    public async start(): Promise<mongoose.ConnectionBase>{
        const url = process.env.DB_URL;
        const db = mongoose.createConnection(url);
        this.connection = db;

        // Setup callback
        this.connection.on("error", this.handleDBError());

        this.connection.on('disconnected', this.handleUnexpectedDisconnect());

        this.connection.on('reconnected', function () {
            console.log('MongoDB reconnected!');
        });

        this.initDB(db);
        await this.initTest();

        return db;
    }

    private handleDBError() {

        return (error: any) => {

            console.log("Error is happenning", error);
        };
    }

    private handleUnexpectedDisconnect() {

        return (error: any) => {

            console.error('mongodb is disconnect', error);
            setTimeout(() => {
                this.start()
            }, 5000);
        };
    }

    public disconnect() {
        this.db.disconnect();
    }

    private async initTest(){
        const u = await this.db.Test.find({});
        if(u.length < 1){
            const rs = await this.db.Test.save({
                name : 'test',
                age : 100,
                time : Date.now()
            });
        }
    }

    private initDB(db){
        this.db.Test = new Test(db);
    }

    public getModel(name: string){
        const rs = this.db[name];
        if(!rs){
            throw new Error('invalid model name : '+name);
        }
        return rs;
    }
}
