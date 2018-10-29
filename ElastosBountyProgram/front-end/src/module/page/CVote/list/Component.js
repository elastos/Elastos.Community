import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Table, Icon, Row, Col, Button} from 'antd'
import I18N from '@/I18N'
import config from '@/config'

import './style.scss'
import moment from 'moment/moment'

export default class extends BaseComponent {

    constructor(p){
        super(p);

        this.state.list = null;
        this.state.loading = true;
    }

    ord_render() {
        const map = {
            '1' : 'New Motion',
            '2' : 'Motion against any existing motion',
            '3' : 'Anything else'
        };

        const columns = [
        {
            title: 'No.',
            dataIndex: 'vid',
            render: (vid, item, index) => {
                return (<a className="tableLink" onClick={this.toDetail.bind(this, item._id)}>#{vid}</a>)
            }
        },
        {
            title : 'Title',
            dataIndex : 'title',
            render: (title, item) => {
                return (<a onClick={this.toDetail.bind(this, item._id)} className="tableLink">{title}</a>)
            }
        },
        {
            title : 'Type',
            dataIndex : 'type',
            render: (type, item) => {
                return map[type];
            }
        },

        {
            title : 'Author',
            dataIndex : 'proposedBy'
        },

        {
            title : 'Vote by Kevin Zhang',
            // dataIndex : '_id',
            render: (id, item)=>{
                return this.voteDataByUser('Kevin Zhang', item);
            }
        },
        {
            title : 'Vote by Fay Li',
            // dataIndex : '_id',
            render: (id, item)=>{
                return this.voteDataByUser('Fay Li', item);
            }
        },
        {
            title : 'Vote by Yipeng Su',
            // dataIndex : '_id',
            render: (id, item)=>{
                return this.voteDataByUser('Yipeng Su', item);
            }
        },
        {
            title : 'Status',
            render: (id, item)=>{
                return item.status || ''
            }
        },

        {
            title : 'Create Time',
            dataIndex : 'createdAt',
            render: (createdAt) => moment(createdAt).format('MM/DD/YYYY hh:mm'),
        }
        ]



        return (
            <div className="p-cvote-list ebp-wrap">
                <div className="d_box">
                    <Row>
                        <Col span={8}>
                            <h3 style={{textAlign:'left'}}>Proposal List</h3>
                        </Col>
                        <Col span={8} offset={8}>
                            {this.props.isCouncil &&
                            <Button style={{width:'100%'}} onClick={this.toCreate.bind(this)} size="large" type="ebp" htmlType="submit" className="d_btn">
                                Create New Proposal
                            </Button>}
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        loading={this.state.loading}
                        dataSource={this.state.list}
                        rowKey={record => record._id}
                    />
                </div>
            </div>

        )
    }

    toDetail(id) {
        this.props.history.push(`/cvote/edit/${id}`);
    }
    toCreate(){
        this.props.history.push('/cvote/create');
    }

    async componentDidMount(){

        this.ord_loading(true);

        const list = await this.props.listData({});

        this.setState({list});

        this.ord_loading();

    }

    ord_checkLogin(isLogin){

    }

    voteDataByUser(u, data){
        const map = data.vote_map;
        if(!map[u]){
            return '';
        }
        const temp = map[u];
        if(temp === 'support') return 'Y';
        if(temp === 'reject') return 'N';
        return '';
    }
}
