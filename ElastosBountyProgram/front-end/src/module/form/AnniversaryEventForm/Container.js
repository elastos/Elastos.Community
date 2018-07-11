import {createContainer, goPath} from "@/util";
import Component from './Component';
import SubmissionService from '@/service/SubmissionService'
import CommunityService from '@/service/CommunityService'
import {message} from 'antd'
import _ from 'lodash'

import {SUBMISSION_TYPE, SUBMISSION_CAMPAIGN} from '@/constant'

message.config({
    top: 100
})


export default createContainer(Component, (state)=>{
    return {
        user: state.user,
        is_login: state.user.is_login
    };
}, () => {
    const submissionService = new SubmissionService();
    const communityService = new CommunityService()

    return {
        async submitForm(formData, st){

            try {
                const rs = await submissionService.create({

                    title: 'Anniversary 2018 - Application',
                    type: SUBMISSION_TYPE.FORM_EXT,
                    campaign: SUBMISSION_CAMPAIGN.ANNI_2008,

                    fullLegalName: formData.fullLegalName,
                    email: this.user.email,

                    occupation: formData.roleInElastos,

                    community: formData.community,
                    dob: formData.dob,

                    // reusing these fields
                    audienceInfo: formData.contactWith,
                    description: formData.contributions,

                    reason: formData.greetingVideoLink
                });

                if (rs) {
                    message.success('Success - one of the admins will be in touch shortly');
                    submissionService.path.push('/profile/submissions');
                }
            } catch (err) {
                console.error(err)
                message.error(err.message) // TODO: add rollbar?
            }
        },

        async getCommunityDetail(communityId) {
            return communityService.get(communityId)
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
        },

        async getSpecificCountryCommunities (countryCode) {
            return communityService.getSpecificCountryCommunities(countryCode)
        },
    };
});
