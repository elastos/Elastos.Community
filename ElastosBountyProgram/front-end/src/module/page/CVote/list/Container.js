import { createContainer, api_request } from '@/util'
import Component from './Component'

export default createContainer(Component, (state) => {
    console.log(state.user);
    return {
        isLogin : state.user.is_login
    }
}, ()=>{
    return {
        async listData(param){
            const rs = await api_request({
                path : '/api/cvote/list',
                method : 'get',
                data : param
            });
            
            return rs;
        }
    }
})
