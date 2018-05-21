import React from 'react';
import StandardPage from '../StandardPage';
import RegisterForm from '@/module/form/RegisterForm/Container';

import './style.scss'

export default class extends StandardPage {
    ord_renderContent() {
        return (
            <div className="p_register ebp-wrap">
                <div className="d_box">
                    <RegisterForm />
                </div>
            </div>
        );
    }
}
