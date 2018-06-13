import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { Form, Col, Row, List, Icon, Input, Divider, Button, Spin } from 'antd'
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
        return <div className="l_banner">
            <div className="pull-left">
                Comments
            </div>
            <div className="pull-right right-align">

            </div>
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
            <Input placeholder="What's on your mind?"/>
        )

        return {
            comment: comment_fn(comment_el)
        }
    }

    renderComments() {
        const type = this.props.type
        const curDetail = this.props[this.props.type]
        const comments = curDetail.comments || []
        const dateFormatter = (createdAt) => moment(createdAt).format('MMM D HH:mm')

        const p = this.getInputProps()

        const commentItems = _.map(comments, (comment, ind) =>
            {
                return {
                    title: _.first(comment).comment,
                    description: _.first(comment).createdBy.username +
                        ', ' + dateFormatter(_.first(comment).createdAt),
                }
            }
        )

        // Show in reverse chronological order
        commentItems && commentItems.reverse();

        return (
            <div>
                <List
                    itemLayout="vertical"
                    pagination={{
                        pageSize: 5,
                    }}
                    dataSource={commentItems}
                    footer={
                        <Form onSubmit={this.handleSubmit.bind(this)} className="c_commentForm">
                            <FormItem>
                                {p.comment}
                            </FormItem>
                            <FormItem>
                                <Button className="ant-btn-ebp pull-right" type="primary" size="small"
                                    htmlType="submit">
                                    Post
                                </Button>
                            </FormItem>
                        </Form>
                    }
                    renderItem={(item, ind) => (
                        <List.Item key={ind}>
                            <List.Item.Meta
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
                this.props.postComment(this.props.type, this.props.model._id, values.comment)
            }
        })
    }
}

export default Form.create()(C)
