import React from 'react';
import StandardPage from '../StandardPage';

import Task from '@/module/task/Container'

import homeHeaderImg from 'img/HomeHeader.jpg'

export default class extends StandardPage {
    ord_renderContent(){

        const backdropStyle = {
            backgroundPosition: '0 50%',
            backgroundImage: `url(${homeHeaderImg})`
        }

        return (
            <div className="c_Home">
                <div className="topBackdrop" style={backdropStyle}>
                    Elastos Bounty Program
                </div>
                <Task />
            </div>
        );
    }

    ord_checkLogin(isLogin){
        // if(!isLogin){
        //     this.props.history.replace('/login');
        // }
    }
}
