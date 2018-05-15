import React from 'react';
import StandardPage from '../StandardPage';

export default class extends StandardPage {
    ord_renderContent() {
        return (
            <h1>Register</h1>
        );
    }

    ord_checkLogin(isLogin) {
        if (isLogin) {
            this.props.history.replace('/home');
        }
    }
}
