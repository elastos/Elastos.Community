import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
    Form,
    Icon,
    Input,
    InputNumber,
    Button,
    Checkbox,
    Radio,
    Select,
    message,
    Row,
    Col,
    Upload,
    Cascader,
    Divider

} from 'antd'
import I18N from '@/I18N'
import {upload_file} from '@/util'
import './style.scss'

const FormItem = Form.Item

class C extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            avatar_loading: false,
            banner_loading: false,
            avatar_url: this.props.user.profile.avatar || '',
            avatar_type: this.props.user.profile.avatarFileType || '',
            avatar_filename: this.props.user.profile.avatarFilename || '',

            banner_url: this.props.user.profile.banner || '',
            banner_type: this.props.user.profile.banneFileType || '',
            banner_filename: this.props.user.profile.bannerFilename || '',

            removeAttachment: true,
            removeBanner: false
        }
    }

    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.updateUser(values, this.state).then(() => {
                    this.props.getCurrentUser()
                });
                this.props.updateAvatar(null)
                this.props.updateBanner(null)
                this.props.switchEditMode()
            }
        })
    }

    getInputProps () {

        const {getFieldDecorator} = this.props.form
        const user = this.props.user

        /*
        ****************************************************************************************
        * General
        ****************************************************************************************
         */
        const firstName_fn = getFieldDecorator('firstName', {
            rules: [{required: true, message: 'First name is required'}],
            initialValue: user.profile.firstName
        })
        const firstName_el = (
            <Input />
        )

        const lastName_fn = getFieldDecorator('lastName', {
            rules: [{required: true, message: 'Last name is required'}],
            initialValue: user.profile.lastName
        })
        const lastName_el = (
            <Input />
        )

        const bio_fn = getFieldDecorator('bio', {
            rules: [{required: true, message: 'Biography is required'}],
            initialValue: user.profile.bio
        })
        const bio_el = (
            <Input.TextArea rows={4}/>
        )

        const avatar_fn = getFieldDecorator('avatar', {
            rules: []
        });
        const p_avatar = {
            showUploadList: false,
            customRequest: (info) => {
                this.setState({
                    avatar_loading: true
                });
                upload_file(info.file).then((d) => {
                    const url = d.url;
                    this.setState({
                        avatar_loading: false,

                        avatar_url: url,
                        avatar_type: d.type,
                        avatar_filename: d.filename,

                        removeAttachment: false
                    });
                    this.props.updateAvatar && this.props.updateAvatar(url)
                })
            }
        };
        const avatar_el = (
            <Upload name="logo" className="pull-right" listType="picture" {...p_avatar}>
                <Button loading={this.state.avatar_loading}>
                    Upload Avatar
                </Button>
            </Upload>
        );

        const banner_fn = getFieldDecorator('banner', {
            rules: []
        });
        const p_banner = {
            showUploadList: false,
            customRequest: (info) => {
                this.setState({
                    banner_loading: true
                });
                upload_file(info.file).then((d) => {
                    const url = d.url;
                    this.setState({
                        banner_loading: false,

                        banner_url: url,
                        banner_type: d.type,
                        banner_filename: d.filename,

                        removeBanner: false
                    });
                    this.props.updateBanner && this.props.updateBanner(url)
                })
            }
        };
        const banner_el = (
            <Upload name="logo" className="pull-right" listType="picture" {...p_banner}>
                <Button loading={this.state.banner_loading}>
                    Upload Banner
                </Button>
            </Upload>
        );

        return {
            firstName: firstName_fn(firstName_el),
            lastName: lastName_fn(lastName_el),
            avatar: avatar_fn(avatar_el),
            banner: banner_fn(banner_el),
            bio: bio_fn(bio_el)
        }
    }

    ord_render () {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()

        const formItemLayout = {
            colon: false,
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        }

        // const existingTask = this.props.existingTask

        // TODO: terms of service checkbox

        // TODO: react-motion animate slide left

        // TODO: description CKE Editor

        return (
            <div className="c_userProfileFormContainer">
                <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                    <Row>
                        <Col sm={{span: 24}} md={{span: 24}}>
                            <FormItem
                                colon={false}
                                labelCol={{ sm: {span: 0}, md: {span: 0} }}
                                wrapperCol={{ sm: {span: 24}, md: {span: 24} }}>
                                {p.avatar}
                                {p.banner}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col sm={{span: 24}} md={{span: 24}}>
                            <FormItem label="First Name" {...formItemLayout}>
                                {p.firstName}
                            </FormItem>

                        </Col>
                        <Col sm={{span: 24}} md={{span: 24}}>
                            <FormItem label="Last Name" {...formItemLayout}>
                                {p.lastName}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem
                        colon={false}
                        labelCol={{ sm: {span: 24}, md: {span: 8} }}
                        wrapperCol={{ sm: {span: 24}, md: {span: 16} }}
                        label="Profile Slogan">
                        {p.bio}
                    </FormItem>
                    <br />
                    <br />
                    <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 10}}}>
                        <Button type="primary" htmlType="submit" loading={this.props.loading ||
                            this.state.avatar_loading || this.state.banner_loading}>
                            {I18N.get('profile.save')}
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }

}
export default Form.create()(C)
