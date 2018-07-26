import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import CommunityService from '@/service/CommunityService'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS} from '@/constant'
import _ from "lodash";

export default createContainer(Component, (state, ownProps) => {
    return {}
}, () => {
    const taskService = new TaskService()
    const communityService = new CommunityService()
    return {
        async getCommunityTree() {
            let communityTree = {
                europe: ["Germany", "Austria"],
                usa: ["New York"],
                australia: ["Melbourne"]
            };
            return communityTree;
        },

        async getSocialEvents () {
            return taskService.index({
                category: TASK_CATEGORY.SOCIAL
            })
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
    }
})
