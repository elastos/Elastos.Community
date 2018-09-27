import React from 'react';
import StandardPage from '../StandardPage';
import LoginOrRegisterForm from '@/module/form/LoginOrRegisterForm/Container';

import './style.scss'

export default class extends StandardPage {
    ord_renderContent() {
        return (
            <div className="p_login ebp-wrap">
                <div className="d_box">
                    <LoginOrRegisterForm />
                </div>
            </div>
        );
    }

    ord_checkLogin(isLogin) {
        if (isLogin) {
            this.props.history.replace('/profile/teams');
        }
    }
}
