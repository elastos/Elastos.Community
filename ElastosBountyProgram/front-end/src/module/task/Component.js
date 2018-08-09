import {TASK_STATUS, TASK_CATEGORY, TASK_TYPE} from '@/constant'

import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import TaskCreateForm from '@/module/form/TaskCreateForm/Container'
import { Col, Row, Popconfirm, Divider, Button, Spin, Icon } from 'antd'
import Comments from '@/module/common/comments/Container'

// TODO: admin detail should also be in a new component too to be consistent
import TaskPublicDetail from './detail/Container'
import ProjectPublicDetail from '@/module/project/detail/Container'

import './style.scss'
import moment from 'moment/moment'

/**
 * This has 3 views
 *
 * 1. Public
 * 2. Admin
 * 3. Edit
 *
 */
export default class extends BaseComponent {

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        taskId && this.props.getTaskDetail(taskId)
    }

    renderMain() {
        return (
            <div className="c_TaskDetail">
                {this.props.page === 'ADMIN' ? this.renderAdminHeader() : this.renderHeader()}
                {this.state.editing ? this.renderEditForm() : this.renderDetail()}
            </div>
        )
    }

    renderEditForm() {
        return <div className="form-wrapper">
            <TaskCreateForm existingTask={this.props.task} page={this.props.page} switchEditMode={this.switchEditMode.bind(this)}/>
        </div>
    }

    renderDetail() {
        return this.props.task.type === TASK_TYPE.PROJECT
            ? <ProjectPublicDetail taskId={this.props.task._id}/>
            : <TaskPublicDetail task={this.props.task} page={this.props.page}/>
    }

    renderAdminHeader() {

        return <div className="l_banner">
            <div className="pull-left">
                Status: <span className="status">{this.props.task.status}</span>
                {this.props.task.status === TASK_STATUS.CREATED &&
                <span className="help-text">&nbsp; - this task does not require approval</span>
                }
                {this.props.task.status === TASK_STATUS.PENDING &&
                <span className="help-text">&nbsp; - this task is awaiting approval</span>
                }
                {this.props.task.status === TASK_STATUS.APPROVED && this.props.task.approvedBy &&
                <span className="help-text">&nbsp; - this task is approved by {this.props.task.approvedBy.username}</span>
                }
                {this.props.task.status === TASK_STATUS.SUCCESS &&
                ((this.props.task.reward.ela > 0 || this.props.task.rewardUpfront.ela > 0) ?
                    <span className="help-text">&nbsp; - this task is awaiting ELA disbursement</span> :
                    <span className="help-text">&nbsp; - this task does not require ELA, no further action is needed</span>
                )
                }
            </div>
            <div className="pull-right right-align">
                {!this.state.editing && this.props.task.status === TASK_STATUS.PENDING &&
                <Popconfirm title="Are you sure you want to approve this task?" placement="left" okText="Yes" onConfirm={this.approveTask.bind(this)}>
                    <Button type="primary">Approve</Button>
                </Popconfirm>
                }
                {/* Admin & Task Owner CAN Mark as Complete */}
                {this.props.task.status === TASK_STATUS.ASSIGNED &&
                <Popconfirm title="Are you sure you want to mark this task as complete?" placement="left" okText="Yes" onConfirm={this.markAsSubmitted.bind(this)}>
                    <Button>Mark as Complete</Button>
                </Popconfirm>
                }
                {!this.state.editing && this.props.task.status === TASK_STATUS.SUBMITTED &&
                <Popconfirm title="Are you sure you want to accept this task as completed?" placement="left" okText="Yes" onConfirm={this.markAsSuccessful.bind(this)}>
                    <Button>Accept as Complete</Button>
                </Popconfirm>
                }
                {!this.state.editing && this.props.task.status === TASK_STATUS.SUCCESS && (this.props.task.reward.ela > 0 || this.props.task.rewardUpfront.ela > 0) &&
                <Popconfirm title="Are you sure you want to mark the ELA as disbursed?" placement="left" okText="Yes" onConfirm={this.markAsDisbursed.bind(this)}>
                    <Button type="primary">Mark as Disbursed</Button>
                </Popconfirm>
                }
                {/*this.state.editing && <Button onClick={this.resetEdit.bind(this)}>Reset</Button>*/}
                <Button onClick={this.switchEditMode.bind(this)}>
                    {this.state.editing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <div className="clearfix"/>
        </div>
    }

    renderHeader() {

        const isTaskOwner = this.props.current_user_id === (this.props.task.createdBy && this.props.task.createdBy._id)

        return <div className="l_banner">
            <div className="pull-left">
                Status: <span className="status">{this.props.task.status}</span>

                {this.props.task.status === TASK_STATUS.PENDING &&
                <span className="help-text">&nbsp; - this task is awaiting approval by an admin</span>
                }
                {this.props.task.status === TASK_STATUS.APPROVED && !(this.props.task.category === TASK_CATEGORY.DEVELOPER && this.props.task.type === TASK_TYPE.EVENT) &&
                <span className="help-text">&nbsp; - this task is waiting on applicants to be selected</span>
                }
                {this.props.task.status === TASK_STATUS.ASSIGNED &&
                <span className="help-text">&nbsp; - this task is active</span>
                }
                {this.props.task.status === TASK_STATUS.SUBMITTED &&
                    <span className="help-text">&nbsp; - this task is awaiting council sign off</span>
                }
                {this.props.task.status === TASK_STATUS.SUCCESS &&
                <span className="help-text">&nbsp; - an admin will review and disburse the ELA reward if any</span>
                }
                {[TASK_STATUS.APPROVED, TASK_STATUS.CREATED].includes(this.props.task.status) && isTaskOwner && !(this.props.task.category === TASK_CATEGORY.DEVELOPER && this.props.task.type === TASK_TYPE.EVENT) &&
                <div className="help-text">&nbsp; -
                    Please accept applicants up to the max accepted number
                </div>
                }
            </div>
            <div className="pull-right right-align">
                {/* Admin & Task Owner CAN Mark as Complete */}
                {this.props.task.status === TASK_STATUS.ASSIGNED && isTaskOwner &&
                <Popconfirm title="Are you sure you want to mark this task as complete?" placement="left" okText="Yes" onConfirm={this.markAsSubmitted.bind(this)}>
                    <Button>Mark as Complete</Button>
                </Popconfirm>
                }
                {[TASK_STATUS.APPROVED, TASK_STATUS.CREATED].includes(this.props.task.status) && isTaskOwner && !(this.props.task.category === TASK_CATEGORY.DEVELOPER && this.props.task.type === TASK_TYPE.EVENT) &&
                <Popconfirm title="Are you sure you want to start this task with the current applicants?" placement="left" okText="Yes" onConfirm={this.forceStart.bind(this)}>
                    <Button>Force Start</Button>
                </Popconfirm>
                }
                {this.props.task.status !== TASK_STATUS.SUCCESS && isTaskOwner &&
                <Button onClick={this.switchEditMode.bind(this)}>
                    {this.state.editing ? 'Cancel' : 'Edit'}
                </Button>
                }
            </div>
            <div className="clearfix"/>
        </div>

    }

    ord_render () {
        return (_.isEmpty(this.props.task) || this.props.task.loading ?
            <div class="center"><Spin size="large" /></div> :
            this.renderMain()
        )
    }

    // TODO: DRY - move to helper
    getCommunityDisp() {
        let str = ''
        if (this.props.task.communityParent) {
            str += this.props.task.communityParent.name + '/'
        }
        if (this.props.task.community) {
            str += this.props.task.community.name
        }

        return str
    }

    async approveTask() {
        const taskId = this.props.task._id
        await this.props.approveTask(taskId)

    }

    async markAsSuccessful() {
        const taskId = this.props.task._id
        await this.props.markAsSuccessful(taskId)
    }

    async markAsSubmitted() {
        const taskId = this.props.task._id
        await this.props.markAsSubmitted(taskId)
    }

    async markAsDisbursed() {
        const taskId = this.props.task._id
        await this.props.markAsDisbursed(taskId)
    }

    async forceStart() {
        const taskId = this.props.task._id
        await this.props.forceStart(taskId)
    }

    async saveTask() {

    }

    async resetEdit() {

    }

    switchEditMode() {
        this.setState({editing: !this.state.editing})
    }

}
