import { createContainer, api_request } from '@/util'
import Component from './Component'

export default createContainer(Component, (state) => {

    return {
        currentUserId: state.user.current_user_id,
        isLogin : state.user.is_login,
        isCouncil: [

            '5b28be2784f6f900350d30b9',
            '5b367c128f23a70035d35425',
            '5bcf21f030826d68a940b017',
            '5bcf21f030826d68a940b018'

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
