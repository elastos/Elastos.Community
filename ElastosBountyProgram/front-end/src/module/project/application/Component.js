import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import _ from 'lodash'
import { Col, Row, message, Input, Avatar, InputNumber, Select } from 'antd'
import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_TYPE, TASK_CANDIDATE_STATUS} from '@/constant'
import Comments from '@/module/common/comments/Container'
import './style.scss'
import I18N from '@/I18N'

const { TextArea } = Input;
const Option = Select.Option;
const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {
    ord_states() {
        return {
        }
    }

    ord_render () {
        return this.renderMain()
    }

    isTaskOwner() {
        return this.props.detail.createdBy._id === this.props.userId
    }

    getApplicant () {
        return _.find(this.props.detail.candidates, { _id: this.props.applicantId })
    }

    renderMain () {
        const applicant = this.getApplicant()
        if (!applicant) {
            return ''
        }
        const appliedDate = moment(applicant.createdAt).format('YYYY / MM / D')

        return (
            <div className="public">
                <div className="gridCol main-area">
                    <div className="application-col">
                        <h3 className="header-text with-gizmo">Application</h3>
                        <div className="application-container">Applied on
                            <span className="application-date"> {appliedDate}</span>
                        </div>
                        <div>
                            <Select
                                className="apply-type-select cr-input"
                                defaultValue="solo">
                                <Option value="solo"><span>Apply as an Individual</span> (Solo)</Option>
                                <Option value="team"><span>Apply as a Team</span> (Team)</Option>
                            </Select>
                        </div>
                        { this.props.detail.bidding &&
                            <div className="bid-container">
                                { !this.isTaskOwner() && _.indexOf(['PENDING', 'CREATED'], this.props.detail.status) >= 0 && (applicant.type !== TASK_CANDIDATE_TYPE.TEAM || applicant.team.owner._id === this.props.userId)
                                    ? <div>
                                        <span>{I18N.get('project.detail.your_bid')} </span>
                                        <InputNumber onChange={_.debounce((value) => this.changeBid(value), 2000)}
                                            defaultValue={applicant.bid}/>
                                        <span> ELA</span>
                                    </div>
                                    : <div>
                                        <h5>
                                            Bid: {applicant.bid} ELA
                                        </h5>
                                    </div>
                                }
                            </div>
                        }
                        <div>
                            <div className="task-reason">Why you wanted to join this task</div>
                            <div className="task-reason-text-area">
                                <p>{applicant.applyMsg}</p>
                            </div>
                        </div>
                    </div>
                    <div className="comments-col">
                        <Comments type="taskCandidate" reduxType="task" canPost={true} model={applicant}
                            detailReducer={(detail) => _.find(detail.candidates, { _id: this.props.applicantId })}
                            returnUrl={`/project-detail/${this.props.detail._id}`}
                        />
                    </div>
                </div>
            </div>
        )
    }

    async changeBid(bid) {
        await this.props.updateApplication(this.props.detail._id, {
            taskCandidateId: this.props.applicantId,
            bid
        })

        message.success(I18N.get('project.detail.bid_updated'))
    }

    showAttachment() {
        const applicant = this.getApplicant()
        const {attachment, attachmentFilename} = applicant

        return attachment
            ? <h5><a href={attachment} target="_blank">{attachmentFilename}</a></h5>
            : <h5>{I18N.get('project.detail.no_attachments')}</h5>
    }

    linkUserDetail(user) {
        this.props.history.push(`/member/${user._id}`)
    }

    async withdrawApplication() {
        // const taskId = this.props.task._id
        // this.props.pullCandidate(taskId, tcId).then(() => {
        //     const prefix = this.props.page === 'LEADER'
        //         ? '/profile' : ''
        //     this.props.history.push(`${prefix}/task-detail/${this.props.task._id}`)
        // })
    }

    async rejectApplication() {

    }
}
