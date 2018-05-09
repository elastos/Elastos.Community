import {createContainer, goPath} from "@/util";
import Component from './Component';
import UserService from '@/service/UserService';
import {message} from 'antd';


export default createContainer(Component, (state)=>{
    return {
        ...state.user.login_form
    };
}, ()=>{
    const userService = new UserService();

    return {
        async login(username, password, remember){
            const rs = await userService.login(username, password, {
                remember
            });

            if(rs){
                message.success('login success');
                userService.path.push('/home');
            }
        }
    };
});