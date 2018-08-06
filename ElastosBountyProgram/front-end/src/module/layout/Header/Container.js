import {createContainer} from '@/util';
import Component from './Component';
import UserService from '@/service/UserService';
import LanguageService from '@/service/LanguageService';
import {message} from 'antd';

export default createContainer(Component, (state) => {
    return {
        isLogin: state.user.is_login,
        role: state.user.role,
        profile: state.user.profile,
        language: state.language,
        pathname: state.router.location.pathname
    };
}, () => {
    const userService = new UserService();
    const languageService = new LanguageService();
    return {
        async logout() {
            const rs = await userService.logout();
            if (rs) {
                message.success('logout success');
                userService.path.push('/login');
            }
        },
        changeLanguage(lang) {
            languageService.changeLanguage(lang);
        }
    };
});
