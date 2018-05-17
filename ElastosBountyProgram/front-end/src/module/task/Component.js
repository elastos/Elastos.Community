import React from 'react';
import BaseComponent from '@/model/BaseComponent'

export default class extends BaseComponent {

    componentDidMount () {
        this.props.fetchTasks()
    }

    ord_render () {
        return <div>
            {this.props.all_tasks.map((task) => {
                return <div key={task.task_id}>
                    ABC {task.task_id} - {task.task_name}
                </div>
            })}
        </div>
    }
}
