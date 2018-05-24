import Base from './Base';
import * as s3 from 's3';
import {uuid} from '../utility';
import * as fs from 'fs';

let s3_client = null;
export default class extends Base {
    private bucket:string = 'ebp-files';
    protected init(){
        if(!s3_client){
            this.initS3Client();
        }
    }

    private initS3Client(){
        s3_client = s3.createClient({
            maxAsyncS3: 20,     // this is the default
            s3RetryCount: 3,    // this is the default
            s3RetryDelay: 1000, // this is the default
            multipartUploadThreshold: 20971520, // this is the default (20 MB)
            multipartUploadSize: 15728640, // this is the default (15 MB)
            s3Options: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_ACCESS_SECRET,
                region: 'us-west-1',
                // endpoint: 's3.yourdomain.com',
                // sslEnabled: false
                // any other options are passed to new AWS.S3()
                // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
            }
        });
    }

    /*
    * @param - file, req.files.file.
    * */
    public async saveFile(file){
        const file_name = uuid()+'_'+file.name;
        const path = process.cwd()+'/.upload/';

        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }

        const rs = file.mv(path+file_name);

        //TODO upload to s3

        return rs;
    }

}