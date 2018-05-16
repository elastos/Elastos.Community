import React from 'react';
import StandardPage from '../StandardPage';

import Task from '@/module/task/Container'

export default class extends StandardPage {
    ord_renderContent(){
        return (
            <Task />
        );
    }

    ord_checkLogin(isLogin){
        // if(!isLogin){
        //     this.props.history.replace('/login');
        // }
    }
}
