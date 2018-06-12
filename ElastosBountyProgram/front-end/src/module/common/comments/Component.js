import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { Form, Col, Row, Icon, Input, Divider, Button, Spin } from 'antd'
import config from '@/config'
import './style.scss'
import store from '@/store';

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
        const taskId = this.props.match.params.taskId
        const submissionId = this.props.match.params.submissionId

        taskId && this.props.resetTaskDetail()
        submissionId && this.props.resetSubmissionDetail()
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
        //this.props.type - the type of model
        //take comments from store details

        const type = this.props.type
        const storeState = store.getState()
        const curDetail = storeState[type] && storeState[type].detail
        const comments = curDetail.comments || []
        const p = this.getInputProps()

        return (
            <div>
                <Row>
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
                </Row>
                {
                    _.map(comments, (comment) => {
                        <Row>
                            <Col span={24} className="gridCol">
                                <h4>
                                    {comment.message}
                                </h4>
                            </Col>
                        </Row>
                    })
                }
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
