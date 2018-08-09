import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { Form, Col, Row, List, Avatar, Icon, Divider, Button, Input } from 'antd'
import config from '@/config'
import './style.scss'
import moment from 'moment'
import _ from 'lodash'

const TextArea = Input.TextArea
const FormItem = Form.Item

class C extends BaseComponent {

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        const submissionId = this.props.match.params.submissionId

        switch (this.props.reduxType) {
            case 'task':
                this.props.getTaskDetail(taskId)
                break
            case 'sumbission':
                this.props.getSubmissionDetail(submissionId)
                break
            default:
                // do nothing
                break
        }
    }

    componentWillUnmount() {
        switch (this.props.reduxType) {
            case 'task':
                this.props.resetTaskDetail()
                break
            case 'sumbission':
                this.props.resetSubmissionDetail()
                break
            default:
                // do nothing
                break
        }
    }

    // only wraps loading / renderMain
    ord_render () {
        return (
            this.renderMain()
        )
    }

    // header + main area
    renderMain() {
        return (
            <div className="c_Comments">
                {this.renderHeader()}
                {this.renderComments()}
            </div>
        )
    }

    renderHeader() {
        return (
            <h3 className="no-margin">Comments</h3>
        )
    }

    getInputProps() {
        const {getFieldDecorator} = this.props.form
        const comment_fn = getFieldDecorator('comment', {
            rules: [{required: true, message: 'Please input your comment!'}],
            initialValue: ''
        })
        const comment_el = (
            <TextArea rows={2} placeholder="Comments or updates"/>
        )

        return {
            comment: comment_fn(comment_el)
        }
    }

    isUserSubscribed() {
        const curDetail = this.props[this.props.reduxType || this.props.type]
        const subscribers = curDetail.subscribers || []
        return !!_.find(subscribers, (subscriber) => {
            return subscriber.user && subscriber.user._id === this.props.currentUserId
        })
    }

    getSubscribeButton() {
        if (this.isUserSubscribed()) {
            return (
                <Button className="ant-btn-ebp pull-left" size="small"
                    onClick={this.unsubscribe.bind(this)} loading={this.props.loading[this.props.type]}>
                    Unsubscribe
                </Button>
            )
        }

        return this.props.canSubscribe ?
            (<Button className="ant-btn-ebp pull-left" size="small"
                onClick={this.subscribe.bind(this)} loading={this.props.loading[this.props.type]}>
                Subscribe
            </Button>) : null
    }

    getFooter() {
        if (!this.props.currentUserId) {
            return <div/>
        }

        const p = this.getInputProps()
        const subscribeButton = this.getSubscribeButton()

        // TODO - canSubscribe requires canPost here, could be improved
        return this.props.canPost ?
            (<Form onSubmit={this.handleSubmit.bind(this)} className="c_commentForm">
                <FormItem>
                    {p.comment}
                </FormItem>
                <FormItem>
                    {subscribeButton}
                    <Button className="ant-btn-ebp pull-right" type="primary" size="small"
                        htmlType="submit" loading={this.props.loading[this.props.type]}>
                        Post
                    </Button>
                </FormItem>
            </Form>) : null;
    }

    getModelId() {
        return _.isString(this.props.model) // Bit naive IMPROVEME
            ? this.props.model
            : this.props.model._id
    }

    subscribe() {
        this.props.subscribe(this.props.type, this.getModelId())
    }

    unsubscribe() {
        this.props.unsubscribe(this.props.type, this.getModelId())
    }

    renderComments() {
        let curDetail = this.props[this.props.reduxType || this.props.type]

        if (this.props.detailReducer) {
            curDetail = this.props.detailReducer(curDetail) || {}
        }

        const comments = curDetail.comments || []
        const dateFormatter = (createdAt) => createdAt ? moment(createdAt).format('MMM D - h:mma') : ''

        const footer = this.getFooter()

        const commentItems = _.map(comments, (comment, ind) =>
            {
                const thread = _.first(comment)
                const createdByUsername = (thread.createdBy && thread.createdBy.username) || ''
                const avatar = (thread.createdBy && thread.createdBy.profile.avatar) || ''
                const createdById = (thread.createdBy && thread.createdBy._id)
                const dateFormatted = dateFormatter(thread.createdAt)

                return {
                    title: thread.comment,
                    description: (
                        <div>
                            <a onClick={() => {createdById && this.props.history.push(`/member/${createdById}`)}}>
                                {createdByUsername}
                            </a>
                            {dateFormatted && <span>, {dateFormatted}</span>}
                        </div>
                    ),
                    avatar,
                }
            }
        )

        // Show in reverse chronological order
        commentItems && commentItems.reverse();

        return  <div>
            {commentItems && commentItems.length ?
                <List
                    size="large"
                    itemLayout="horizontal"
                    pagination={{
                        pageSize: 5,
                    }}
                    dataSource={commentItems}
                    header={footer}
                    renderItem={(item, ind) => (
                        <List.Item key={ind}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}/>}
                                title={item.title}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                /> :
                <div>
                    {footer}
                    <div className="center no-info">
                        no comments
                    </div>
                </div>
            }
        </div>
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.postComment(this.props.type,
                    this.props.reduxType,
                    this.props.detailReducer,
                    this.getModelId(),
                    values.comment).then(() => {
                        this.props.form.resetFields()
                    })
            }
        })
    }
}

export default Form.create()(C)
