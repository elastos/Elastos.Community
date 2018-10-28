import {createContainer, goPath, api_request} from "@/util"
import Component from './Component'
import UserService from '@/service/UserService'
import {message} from 'antd'



export default createContainer(Component, (state) => {

    return {
        user : state.user,
        isLogin : state.user.is_login,
        static : {
            voter : [
                {value : 'Yipeng Su'},
                {value : 'Fay Li'},
                {value : 'Kevin Zhang'}
            ],
            select_type : [
                {name : 'New Motion', code : 1},
                {name : 'Motion against any existing motion', code : 2},
                {name : 'Anything else', code : 3}
            ],
            select_vote : [
                {name : 'Support', value : 'support'},
                {name : 'Reject', value : 'reject'},
                {name : 'Abstention', value : 'abstention'}
            ]
        },
        isCouncil: [

            '5b9024b744293737fd6532e2',
            '5b9024b744293737fd6532e3',
            '5b9024b744293737fd6532e4',
            '5b9024b744293737fd6532e5'

        ].indexOf(state.user.current_user_id) >= 0
    }
}, () => {
    return {
        async createCVote(param){
            const rs = await api_request({
                path : '/api/cvote/create',
                method : 'post',
                data : param
            });
            console.log(rs);
            return rs;
        },
        async updateCVote(param){
            const rs = await api_request({
                path : '/api/cvote/update',
                method : 'post',
                data : param
            });
            return rs;
        },
        async finishCVote(param){
            const rs = await api_request({
                path : '/api/cvote/finish',
                method : 'get',
                data : param
            });
            return rs;
        },
        async updateNotes(param){
            const rs = await api_request({
                path : '/api/cvote/update_notes',
                method : 'post',
                data : param
            });
            return rs;
        }
    }
})
