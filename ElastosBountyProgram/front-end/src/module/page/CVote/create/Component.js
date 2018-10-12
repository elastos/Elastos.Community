import React from 'react';
import StandardPage from '../../StandardPage';
import CVoteForm from '@/module/form/CVoteForm/Container';
import {Breadcrumb, Icon} from 'antd';

import './style.scss'

export default class extends StandardPage {
    ord_renderContent(){
        return (
            <div className="p-cvote">
                <div className="d_box">
                    <div style={{textAlign:'left'}}>
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={this.goList.bind(this)} href="javascript:void(0)">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>create proposal</Breadcrumb.Item>
                        </Breadcrumb>

                    </div>
                    <CVoteForm />
                </div>
            </div>
        );
    }

    ord_checkLogin(isLogin){
        if(!isLogin){
            this.props.history.replace('/login');
        }
    }

    goList(){
        this.props.history.push('/cvote/list');
    }

}
