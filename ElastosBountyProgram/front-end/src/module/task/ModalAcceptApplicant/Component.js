import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Form, Modal, Select, Button, Input } from 'antd'
const TextArea = Input.TextArea
import config from '@/config'

const FormItem = Form.Item

export default Form.create()(
    class C extends BaseComponent {

        ord_render () {
            const {onCancel, onCreate, visible, taskCandidate} = this.props
            if (!taskCandidate) {
                return <div/>
            }

            const footerModal = (
                <div>
                    <Button onClick={onCreate} type="primary" className="ant-btn-ebp">Accept Applicant</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            )

            return (
                <Modal
                    visible={visible}
                    title="Accept Applicant"
                    footer={footerModal}
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <p>
                        Are you sure you want to accept this applicant?<br/>
                        <br/>
                        {_.capitalize(taskCandidate.type)}: &nbsp;
                        <span className="strong-text">
                            {taskCandidate.type === 'USER' ? taskCandidate.user.username : taskCandidate.team.name}
                        </span>
                    </p>

                    <h5>Application Message</h5>

                    <p>
                        {taskCandidate.applyMsg ? taskCandidate.applyMsg : 'no message given'}
                    </p>
                </Modal>
            )
        }
    },
)
