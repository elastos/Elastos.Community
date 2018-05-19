import * as mongoose from 'mongoose';
import Test from './Test';
import User from './User';
import Team from './Team';
import User_Team from './User_Team';
import Task from './Task';
import Community from './Community';
import User_Community from './User_Community';

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
        this.connection.on('error', this.handleDBError());

        this.connection.on('disconnected', this.handleUnexpectedDisconnect());

        this.connection.on('reconnected', function () {
            console.log('MongoDB reconnected!');
        });

        this.initDB(db);
        await this.initTest();

        await this.prepareRecord();

        return db;
    }

    private handleDBError() {

        return (error: any) => {

            console.log('Error is happenning', error);
        };
    }

    private handleUnexpectedDisconnect() {

        return (error: any) => {

            console.error('mongodb is disconnect', error);
            setTimeout(() => {
                this.start();
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
        this.db.User = new User(db);
        this.db.Team = new Team(db);
        this.db.User_Team = new User_Team(db);
        this.db.Task = new Task(db);
        this.db.Community = new Community(db);
        this.db.User_Community = new User_Community(db);
    }

    public getModel(name: string){
        const rs = this.db[name];
        if(!rs){
            throw new Error('invalid model name : '+name);
        }
        return rs;
    }

    private async prepareRecord(){
        // create admin user
        const doc = {
            username: `admin`,
            password: 'admin_password',
            email: 'admin@ebp.com',
            role: 'ADMIN',
            profile: {
                firstName: 'Admin',
                lastName: 'Ebp',
                region: {
                    country: 'China',
                    city: ''
                }
            }
        };
        try{
            const rs = await this.db.User.save(doc);
            console.log('create admin user =>', rs);
        }catch(e){
            console.log('admin user is already exist');
        }
    }
}
