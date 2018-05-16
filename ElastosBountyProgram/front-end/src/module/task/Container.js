import {createContainer} from "@/util"
import Component from './Component'
import TaskService from '@/service/TaskService'

export default createContainer(Component, (state)=>{
    return {
        abc: 'def'
    }
}, ()=>{
    return {
        async helloWorld() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('hello world')
                    resolve()
                }, 5000)
            })
        },

        async fetchTasks() {

            const taskService = new TaskService()
            const rs = await taskService.index()

            return rs
        }
    }
})
