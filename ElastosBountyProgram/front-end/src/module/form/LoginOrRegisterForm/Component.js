import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import I18N from '@/I18N'

import './style.scss'

export default class extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            persist: true
        }
    }

    ord_render() {
        return (
            <div>LoginOrRegisterForm</div>
        )
    }
}
