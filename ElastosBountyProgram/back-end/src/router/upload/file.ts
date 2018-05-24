import Base from '../Base';
import UploadService from '../../service/UploadService';



export default class extends Base {
    // protected needLogin = true;
    async action(){
        const uploadService = this.buildService(UploadService);
        if(!this.req['files'] || !this.req['files'].file){
            throw 'invalid upload file';
        }
        const rs = await uploadService.saveFile(this.req['files'].file);

        return this.result(1, rs);
    }
}