import * as hmacSha512 from 'crypto-js/hmac-sha512';

const secret = process.env.APP_SECRET || 'app';
export default {
    sha512(str: string){
        return hmacSha512(str, secret).toString();
    }
};