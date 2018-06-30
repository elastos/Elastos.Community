import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { Form, Col, Row, List, Avatar, Icon, Input, Divider, Button, Spin } from 'antd'
import config from '@/config'
import './style.scss'
import moment from 'moment'

const FormItem = Form.Item

class C extends BaseComponent {

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        const submissionId = this.props.match.params.submissionId

        if (taskId) {
            this.props.getTaskDetail(taskId)
        }

        if (submissionId) {
            this.props.getSubmissionDetail(submissionId)
        }
    }

    componentWillUnmount() {
        switch (this.props.type) {
            case 'task':
                // can't do this - we need to keep detail data sometimes when switching to an edit form
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
        return <div>
            <Divider>Comments</Divider>
            <div className="clearfix"/>
        </div>
    }

    getInputProps() {
        const {getFieldDecorator} = this.props.form
        const comment_fn = getFieldDecorator('comment', {
            rules: [{required: true, message: 'Please input your comment!'}],
            initialValue: ''
        })
        const comment_el = (
            <Input placeholder="Comments or updates"/>
        )

        return {
            comment: comment_fn(comment_el)
        }
    }

    getFooter() {
        const p = this.getInputProps()

        return this.props.canPost ?
            (<Form onSubmit={this.handleSubmit.bind(this)} className="c_commentForm">
                <FormItem>
                    {p.comment}
                </FormItem>
                <FormItem>
                    <Button className="ant-btn-ebp pull-right" type="primary" size="small"
                        htmlType="submit">
                        Post
                    </Button>
                </FormItem>
            </Form>) : null;
    }

    renderComments() {
        const type = this.props.type
        const curDetail = this.props[this.props.type]
        const comments = curDetail.comments || []
        const dateFormatter = (createdAt) => moment(createdAt).format('MMM D HH:mm')

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
                            <span>, {dateFormatted}</span>
                        </div>
                    ),
                    avatar,
                }
            }
        )

        // Show in reverse chronological order
        commentItems && commentItems.reverse();

        return (
            <div>
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
                                avatar={<Avatar src={item.avatar} />}
                                title={item.title}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.postComment(this.props.type, this.props.model._id, values.comment).then(() => {
                    this.props.form.resetFields()
                })
            }
        })
    }
}

export default Form.create()(C)
