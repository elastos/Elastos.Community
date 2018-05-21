import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Button, Modal } from 'antd'

import './style.scss'

export default class extends BaseComponent {
    onClickProxy() {
        if (Number(1) === 1) {
            this.props.onOk.call(null, {a: 'b'});
        } else {
            alert('TODO show error popup');
        }
    }

    onCancelProxy() {
        this.props.onCancel.call();
    }

    ord_render () {
        const footerModal = (
            <div>
                <Button onClick={this.onClickProxy.bind(this)} type="primary">Add country</Button>
                <Button onClick={this.onCancelProxy.bind(this)}>Cancel</Button>
            </div>
        )

        return (
            <Modal
                title="Add country"
                visible={this.props.visible}
                footer={footerModal}
            >
                <div>
                    TODO form of modal here
                </div>
            </Modal>
        )
    }
}
