import React from 'react';
import StandardPage from '../StandardPage';
import LoginForm from '@/module/form/LoginForm/Container';

import './style.scss'

export default class extends StandardPage {
    ord_renderContent(){
        return (
            <div className="p_login ebp-wrap">
                <div className="d_box">
                    <LoginForm />
                </div>
            </div>
        );
    }

    ord_checkLogin(isLogin){
        if(isLogin){
            this.props.history.replace('/home');
        }
    }
}
