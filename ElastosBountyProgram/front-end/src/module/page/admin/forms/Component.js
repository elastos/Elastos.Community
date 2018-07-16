import React from 'react'
import AdminPage from '../BaseAdmin'
import moment from 'moment'

import '../admin.scss'
import './style.scss'

import Navigator from '../shared/Navigator/Component'

import { Checkbox, Breadcrumb, Col, Icon, Row, Select, Input, Table, Popover, Popconfirm, message } from 'antd'
import { Link } from 'react-router-dom'

import config from '@/config'

export default class extends AdminPage {

    constructor(props) {
        super(props)

        this.state = {
            textFilter: '',
            campaign: '',
            showArchived: false
        }
    }

    async componentDidMount() {
        await super.componentDidMount()
        this.props.getSubmissions()
    }

    componentWillUnmount() {
        this.props.resetSubmissions()
    }

    handleSearch(value) {
        this.setState({textFilter: value})
    }

    ord_renderContent () {

        let submissionData = this.props.all_submissions

        // filter results
        if (this.state.textFilter) {
            submissionData = submissionData.filter((submission) => {
                let regExp = new RegExp(this.state.textFilter, 'i')
                return (
                    regExp.test(submission.title) ||
                    regExp.test(submission.description) ||
                    regExp.test(submission.fullLegalName)
                )
            })
        }

        if (this.state.campaign) {
            submissionData = submissionData.filter((submission) => submission.campaign === this.state.campaign)
        }

        const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: '20%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkSubmissionDetail.bind(this, record._id)} className="tableLink">
                    {name}
                    {record.archived &&
                    <span className="no-info"> (archived)</span>
                    }
                </a>
            },
            sorter: (a, b) => {
                if (!a.title || !b.title) {
                    return 0
                }
                return a.title.localeCompare(b.title)
            }

        }, {
            title: 'Name',
            dataIndex: 'fullLegalName'
        }, {
            title: 'Campaign',
            dataIndex: 'campaign',
            className: 'fontWeight500 allow-wrap',
            render: (campaign, record) => {
                return config.dict.formCampaigns[campaign]
            }
        }, {
            title: 'Created',
            dataIndex: 'createdAt',
            render: (createdAt) => moment(createdAt).format('MMM D'),
            sorter: (a, b) => {
                return moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
            },
            defaultSortOrder: 'descend'
        }, {
            title: '',
            dataIndex: '_id',
            key: 'actions',
            width: '5%',
            render: (id, record) => {
                return <div>
                    <Popover content="archive">
                        <Popconfirm title="Are you sure you want to archive this item?" placement="top" okText="Yes" onConfirm={this.archiveItem.bind(this, id)}>
                            <Icon type="inbox"/>
                        </Popconfirm>
                    </Popover>
                </div>
            }
        }]

        return (
            <div className="p_admin_index ebp-wrap">
                <div className="d_box">
                    <div className="p_admin_breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>Forms</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={20} className="c_SubmissionTableContainer admin-left-column wrap-box-user">
                                <div className="pull-right">
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{width: 200, marginLeft: 8}}
                                        placeholder="Select a campaign"
                                        onChange={this.selectCampaign.bind(this)}
                                    >
                                        {_.map(config.dict.formCampaigns, (campaign, key) => {
                                            return <Select.Option key={key} value={key}>
                                                {campaign}
                                            </Select.Option>
                                        })}
                                    </Select>
                                </div>
                                <div className="pull-right">
                                    <Input.Search onSearch={this.handleSearch.bind(this)}
                                                  prefix={<Icon type="file-text" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                  placeholder="search"/>
                                </div>
                                <div className="showArchivedContainer pull-right">
                                    Show Archived
                                    &nbsp;
                                    <Checkbox onClick={this.toggleShowArchived.bind(this)} checked={this.state.showArchived}/>
                                </div>
                                <div className="clearfix vert-gap-sm"/>
                                <Table
                                    columns={columns}
                                    rowKey={(item) => item._id}
                                    dataSource={submissionData}
                                    loading={this.props.loading}
                               />
                            </Col>
                            <Col span={4} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'forms'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }

    // TODO: all UI should be moved from container to component
    async archiveItem(submissionId) {
        try {
            await this.props.archiveSubmission(submissionId)
            message.success('Item archived successfully')

        } catch (err) {
            console.error(err)
            message.error('There was a problem archiving this item')
        }
    }

    async toggleShowArchived() {

        await this.setState({
            showArchived: !this.state.showArchived
        })

        await this.props.showArchived(this.state.showArchived)
    }

    async selectCampaign(value) {
        await this.setState({
            campaign: value
        })
    }

    linkSubmissionDetail(submissionId) {
        this.props.history.push(`/admin/submission-detail/${submissionId}`)
    }
}
