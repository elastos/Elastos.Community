import React from 'react'
import StandardPage from '../../StandardPage'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, Breadcrumb, Icon, List, Spin, Avatar, Modal } from 'antd'
import _ from 'lodash'

export default class extends StandardPage {
    ord_renderContent(){
        return (
            <div className="p_council">
                <div className="ebp-header-divider"></div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_content">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderList(){
        const listData = this.getListData();
        const p_list = {
            itemLayout : 'horizontal',
            // size : 'small',
            // pageSize : 10,
            dataSource : listData,
            header : (<h2 style={{padding:0}}>{I18N.get('council.0002')}</h2>)
            // renderItem : ()=>{

            // }
        };

        return (
            <div className="d_list">
                {/* <h4>{I18N.get('council.0002')}</h4>
                <hr /> */}
            
                <List {...p_list} renderItem={item => (
                    <List.Item key={item.title} >
                        <List.Item.Meta
                        title={<a href={`/council/detail/${item.id}`} className="f_h4">{item.title}</a>}
                        description={item.description}
                         />
                        <div style={{position:'relative',top:20}}>{item.date}</div>
                    </List.Item>
                    )}
                /> 

            </div>
        );
    }
    getListData(){
        return [
            {
                id : '1',
                title : I18N.get('council.list.1'),
                description : I18N.get('council.desc.1'),
                date : '09/13/2018'
            },
            {
                id : '2',
                title : I18N.get('council.list.2'),
                description : I18N.get('council.desc.2'),
                date : '09/13/2018'
            },
            {
                id : '1',
                title : I18N.get('council.list.3'),
                description : '',
                date : '09/13/2018'
            },
            {
                id : '1',
                title : I18N.get('council.list.4'),
                description : '',
                date : '09/13/2018'
            },
            {
                id : '1',
                title : I18N.get('council.list.5'),
                description : '',
                date : '09/13/2018'
            }
        ];
    }
}
