import * as mongoose from 'mongoose';
import Test from './Test';
import User from './User';
import Team from './Team';
import User_Team from './User_Team';
import Task from './Task';
import Community from './Community';
import User_Community from './User_Community';
import Task_Candidate from './Task_Candidate';

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
        this.db.Task_Candidate = new Task_Candidate(db);
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
            username: 'admin@ebp.com',
            password: 'd6e2bd6e06dae12c1126b29682080ea69273f680f167e6dcb4af241e514577aceca46eb088ede2e8822f3a0893e5cd98952d0a062f030c0ebc90310ab053478c',
            salt: '27b12e6a843a3326051dcd184e3c436d',
            email: 'admin@ebp.com',
            role: 'ADMIN',
            active: true,
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
        }catch(err){
            if(err.code === 11000){
                console.log('admin user is already exist');
            }
            else{
                console.error(err);
            }
        }
    }
}
