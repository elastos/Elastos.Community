import {createContainer, goPath} from "@/util";
import Component from './Component';
import UserService from '@/service/UserService';
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
    const userService = new UserService();

    return {
        async getCurrentUser() {

            try {
                const rs = await userService.getCurrentUser()
            } catch (err) {
                message.error(err.message)
            }
        },

        async updateUser(formData, state) {
            // TODO: refactor this, if it's current user it's current_user_id and otherwise it's _id
            // should always be _id
            const userId = this.user.current_user_id || this.user._id
            const doc = {
                profile: {
                    // General
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    bio: formData.bio,
                    motto: formData.motto,
                    avatar: state.avatar_url,
                    avatarFilename: state.avatar_filename,
                    avatarFileType: state.avatar_type,
                    banner: state.banner_url,
                    bannerFilename: state.banner_filename,
                    bannerFileType: state.banner_type
                },

                removeAttachment: state.removeAttachment,
                removeBanner: state.removeBanner
            }

            if(this.is_admin){
                doc.role = formData.role
            }

            try {
                const rs = await userService.update(userId, doc);

                if (rs) {
                    message.success('User updated successfully');

                    // state.editing = false
                    // this.setState({editing: false})
                }
            } catch (err) {
                // message.error('There was an error creating this task')
                message.error(err.message) // TODO: add rollbar?
            }
        }
    };
});
