import { createContainer, api_request } from '@/util'
import Component from './Component'

export default createContainer(Component, (state) => {

    return {
        currentUserId: state.user.current_user_id,
        isLogin : state.user.is_login,
        isCouncil: [

            '5b9024b744293737fd6532e2',
            '5b9024b744293737fd6532e3',
            '5b9024b744293737fd6532e4',
            '5b9024b744293737fd6532e5'

        ].indexOf(state.user.current_user_id) >= 0
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
