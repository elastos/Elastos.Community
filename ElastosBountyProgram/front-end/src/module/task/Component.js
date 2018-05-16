import React from 'react';
import BaseComponent from '@/model/BaseComponent'

export default class extends BaseComponent {

    componentDidMount () {
        this.props.fetchTasks()
    }

    ord_render () {

        this.props.helloWorld()

        return <div>Hello World 2</div>
    }
}
