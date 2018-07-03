import {createContainer, goPath} from "@/util";
import Component from './Component';
import TaskService from '@/service/TaskService';
import CommunityService from '@/service/CommunityService'
import {message} from 'antd'
import _ from 'lodash'

message.config({
    top: 100
})


export default createContainer(Component, (state)=>{
    return {
        is_admin: state.user.is_admin
    };
}, ()=>{
    const taskService = new TaskService();
    const communityService = new CommunityService();

    return {
        async createTask(formData, st){
            try {
                let createObj = {

                    assignSelf: formData.assignSelf,

                    name: formData.taskName,
                    category: formData.taskCategory,
                    type: formData.taskType,

                    applicationDeadline: formData.taskApplicationDeadline,
                    completionDeadline: formData.taskCompletionDeadline,

                    description: formData.taskDesc,
                    descBreakdown: formData.taskDescBreakdown,

                    infoLink: formData.taskLink,
                    thumbnail: st.upload_url,
                    attachment: st.attachment_url,
                    attachmentFilename: st.attachment_filename,
                    attachmentType: st.attachment_type,
                    community: formData.community,
                    communityParent: formData.communityParent,

                    candidateLimit: formData.taskCandLimit,
                    candidateSltLimit: formData.taskCandSltLimit,
                }

                if (formData.isUsd) {
                    // we don't track ela which is a derived value
                    Object.assign(createObj, {
                        rewardUpfront: {
                            ela: null,
                            elaDisbursed: 0,

                            usd: formData.taskRewardUpfrontUsd * 100,
                            elaPerUsd: formData.taskRewardUpfrontElaPerUsd,
                            isUsd: true
                        },
                        reward: {
                            ela: null,
                            elaDisbursed: 0,
                            votePower: parseFloat(formData.reward) * 100,

                            usd: formData.taskRewardUsd * 100,
                            elaPerUsd: formData.taskRewardElaPerUsd,
                            isUsd: true
                        }
                    })
                } else {
                    Object.assign(createObj, {
                        rewardUpfront: {
                            ela: formData.taskRewardUpfront * 1000,
                            elaDisbursed: 0,

                            usd: null,
                            elaPerUsd: null,
                            isUsd: false
                        },
                        reward: {
                            ela: formData.taskReward * 1000,
                            elaDisbursed: 0,
                            votePower: parseFloat(formData.reward) * 100,

                            usd: null,
                            elaPerUsd: null,
                            isUsd: false
                        }
                    })
                }

                const rs = await taskService.create(createObj);

                if (rs) {
                    message.success('Task created successfully');
                    taskService.path.push(`/profile/task-detail/${rs._id}`);
                }
            } catch (err) {
                // message.error('There was an error creating this task')
                message.error(err.message) // TODO: add rollbar?
            }
        },

        async updateTask(formData, state) {

            const taskId = this.existingTask._id

            try {
                let updateObj = {
                    name: formData.taskName,
                    category: formData.taskCategory,
                    type: formData.taskType,

                    applicationDeadline: formData.taskApplicationDeadline,
                    completionDeadline: formData.taskCompletionDeadline,

                    description: formData.taskDesc,
                    descBreakdown: formData.taskDescBreakdown,

                    infoLink: formData.taskLink,
                    thumbnail: state.upload_url,
                    community: formData.community,
                    communityParent: formData.communityParent,

                    // TODO: attachment

                    candidateLimit: formData.taskCandLimit,
                    candidateSltLimit: formData.taskCandSltLimit,
                }

                // TODO: now ensure we don't delete the other currency value
                if (formData.isUsd) {
                    // we don't track ela which is a derived value
                    Object.assign(updateObj, {
                        rewardUpfront: {
                            ela: null,
                            elaDisbursed: 0,

                            usd: formData.taskRewardUpfrontUsd * 100,
                            elaPerUsd: formData.taskRewardUpfrontElaPerUsd,
                            isUsd: true
                        },
                        reward: {
                            ela: null,
                            elaDisbursed: 0,
                            votePower: parseFloat(formData.reward) * 100,

                            usd: formData.taskRewardUsd * 100,
                            elaPerUsd: formData.taskRewardElaPerUsd,
                            isUsd: true
                        }
                    })
                } else {
                    Object.assign(updateObj, {
                        rewardUpfront: {
                            ela: formData.taskRewardUpfront * 1000,
                            elaDisbursed: 0,

                            usd: null,
                            elaPerUsd: null,
                            isUsd: false
                        },
                        reward: {
                            ela: formData.taskReward * 1000,
                            elaDisbursed: 0,
                            votePower: parseFloat(formData.reward) * 100,

                            usd: null,
                            elaPerUsd: null,
                            isUsd: false
                        }
                    })
                }

                const rs = await taskService.update(taskId, updateObj);

                if (rs) {
                    message.success('Task updated successfully');

                    state.editing = false
                    // this.setState({editing: false})
                }
            } catch (err) {
                // message.error('There was an error creating this task')
                message.error(err.message) // TODO: add rollbar?
            }
        },

        async getTaskDetail (taskId) {
            return taskService.get(taskId)
        },

        async resetTaskDetail() {
            return taskService.resetTaskDetail()
        },

        async getAllCommunities() {
            return new Promise((resolve, reject) => {
                communityService.getAll().then((data) => {
                    const cascaderItems =  data.map((item) => {
                        return {
                            value: item._id,
                            label: item.name,
                            parentId: item.parentCommunityId,
                        }
                    })

                    const rootCascaderItems = _.filter(cascaderItems, {
                        parentId: null
                    })

                    rootCascaderItems.forEach((rootCascaderItem) => {
                        const children = _.filter(cascaderItems, {
                            parentId: rootCascaderItem.value
                        })

                        if (children && children.length) {
                            rootCascaderItem.children = children
                        }
                    })

                    resolve(rootCascaderItems)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    };
});
