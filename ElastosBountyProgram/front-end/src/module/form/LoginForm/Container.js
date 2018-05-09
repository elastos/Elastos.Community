import {createContainer, goPath} from "@/util";
import Component from './Component';
import UserService from '@/service/UserService';


export default createContainer(Component, (state)=>{
    return {
        ...state.user.login_form
    };
}, ()=>{
    const userService = new UserService();

    return {
        async login(username, password, remember){
            await userService.login(username, password, {
                remember
            });

            return true;
        }
    };
});