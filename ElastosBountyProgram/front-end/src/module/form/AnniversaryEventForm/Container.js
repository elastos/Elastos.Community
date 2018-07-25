import {createContainer, goPath} from "@/util";
import Component from './Component';
import SubmissionService from '@/service/SubmissionService'
import UserService from '@/service/UserService'
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
    const userService = new UserService()

    return {
        async getExistingSubmission() {

        },

        async submitForm(formData, st){

            try {
                const rs = await submissionService.create({

                    title: 'Anniversary 2018 - Application',
                    type: SUBMISSION_TYPE.FORM_EXT,
                    campaign: SUBMISSION_CAMPAIGN.ANNI_2008,

                    fullLegalName: formData.fullLegalName,
                    email: this.user.email,

                    description: '',

                    attachment: st.attachment_url,
                    attachmentFilename: st.attachment_filename,
                    attachmentType: st.attachment_type
                });

                if (formData.walletAddress) {
                    const userRs = await userService.update(this.user.current_user_id, {
                        profile: {
                            walletAddress: formData.walletAddress
                        }
                    })
                }

                if (rs) {
                    message.success('Success - one of the admins will be in touch shortly');
                    submissionService.path.push('/profile/submissions');
                }
            } catch (err) {
                console.error(err)
                message.error(err.message) // TODO: add rollbar?
            }
        }
    };
});
