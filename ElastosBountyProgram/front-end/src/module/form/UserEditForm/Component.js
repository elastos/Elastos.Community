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
    Divider,
    TreeSelect
} from 'antd'
import config from '@/config'
import { MIN_LENGTH_PASSWORD } from '@/config/constant'
import TimezonePicker from 'react-timezone'
import I18N from '@/I18N'
import {upload_file} from '@/util'
import './style.scss'
import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, USER_GENDER, USER_SKILLSET, USER_PROFESSION} from '@/constant'

const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

/**
 * This is generic task create form for both Developer and Social Bounties / Events
 *
 * Which version of the form depends on the leader's program
 *
 * Leaders - can create:
 * - Events (offline) restricted to their area - must be approved
 * - Events (online) anywhere - Social or Developer
 *
 * TODO: in the future we should developer leaders
 *
 * Community Leaders - each community has a leader
 * - a leader can create events in their own local community or online community
 * - local offline events are automatically shown in their local community, a country leader
 *  can create events in any child community
 * - these events are shown in the Social page as well
 * - a local event can have sub tasks, these are shown as tasks in the Social page
 */
class C extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            communityTrees: [],
            section: 1,
        }
    }

    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.updateUser(values, this.state).then(() => {
                    this.props.getCurrentUser()
                });
                this.props.switchEditMode()
            }
        })
    }

    checkEmail(rule, value, callback, source, options) {
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (this.props.is_admin && value && emailRegex.test(value) && this.props.user.email !== value) {
            this.props.checkEmail(value).then((isExist) => {
                if (isExist) {
                    callback(I18N.get('register.error.duplicate_email'))
                } else {
                    callback()
                }
            })
        } else {
            callback()
        }
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback(I18N.get('register.error.passwords')) // Two passwords you entered do not match'
        } else {
            callback()
        }
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true })
        }
        if (value && value.length < MIN_LENGTH_PASSWORD) {
            callback(`${I18N.get('register.error.password_length_1')} ${MIN_LENGTH_PASSWORD} ${I18N.get('register.error.password_length_2')}`)
        }
        callback()
    }

    getSkillsets() {
        return _.map(USER_SKILLSET, (skillsets, category) => {
            return {
                title: I18N.get(`user.skillset.group.${category}`),
                value: category,
                key: category,
                children: _.map(skillsets, (skillset) => {
                    return {
                        title: I18N.get(`user.skillset.${skillset}`),
                        value: skillset,
                        key: skillset
                    }
                })
            }
        })
    }

    getProfessions() {
        return _.keys(USER_PROFESSION)
    }

    getFormItemLayout() {
        return {
            colon: false,
            labelCol: {
                xs: {span: 12},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        }
    }

    getInputProps () {

        const {getFieldDecorator} = this.props.form
        const user = this.props.user

        /*
        ****************************************************************************************
        * General
        ****************************************************************************************
         */
        const username_fn = getFieldDecorator('username', {
            rules: [{required: true, message: I18N.get('from.UserEditForm.username.required')}],
            initialValue: user.username
        })
        const username_el = (
            <Input disabled/>
        )

        const role_fn = getFieldDecorator('role', {
            rules: [{required: true, message: I18N.get('user.edit.form.label_role')}],
            initialValue: user.role
        })
        const role_el = (
            <Select showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                placeholder="Role"
                // Fix select dropdowns in modals
                // https://github.com/vazco/uniforms/issues/228
                getPopupContainer={x => {
                    while (x && x.tagName.toLowerCase() !== 'form') {
                        x = x.parentElement;
                    }

                    return x;
                }}>
                {_.entries(config.data.mappingRoleToName).map(([key, val]) => {
                    return <Select.Option key={key} value={key}>
                        {I18N.get(val)}
                    </Select.Option>
                })}
            </Select>
        )

        const email_fn = getFieldDecorator('email', {
            rules: [{
                required: true, message: I18N.get('user.edit.form.label_email')
            }, {
                type: 'email', message: I18N.get('register.error.email'),
            }, {
                validator: this.checkEmail.bind(this)
            }],
            initialValue: user.email
        })
        const email_el = (
            <Input disabled={!(this.props.is_admin && this.props.history.location.pathname.indexOf("/admin/profile/") !== -1)} />
        )

        const password_fn = getFieldDecorator('password', {
            rules: [{
                required: false, message: I18N.get('register.form.label_password')
            }, {
                validator: this.validateToNextPassword.bind(this)
            }]
        })

        const password_el = (
            <Input type="password" />
        )

        const passwordConfirm_fn = getFieldDecorator('passwordConfirm', {
            rules: [{
                required: false, message: I18N.get('register.form.label_password_confirm')
            }, {
                validator: this.compareToFirstPassword.bind(this)
            }]
        })

        const passwordConfirm_el = (
            <Input type="password" />
        )

        const firstName_fn = getFieldDecorator('firstName', {
            rules: [{required: true, message: I18N.get('from.UserEditForm.firstName.required')}],
            initialValue: user.profile.firstName
        })
        const firstName_el = (
            <Input />
        )

        const lastName_fn = getFieldDecorator('lastName', {
            rules: [{required: true, message: I18N.get('from.UserEditForm.lastName.required')}],
            initialValue: user.profile.lastName
        })
        const lastName_el = (
            <Input />
        )

        const gender_fn = getFieldDecorator('gender', {
            rules: [],
            initialValue: user.profile.gender
        });
        const gender_el = (
            <RadioGroup>
                <Radio key={USER_GENDER.MALE} value={USER_GENDER.MALE}>
                    {config.data.mappingGenderKeyToName[USER_GENDER.MALE]}
                </Radio>
                <Radio key={USER_GENDER.FEMALE} value={USER_GENDER.FEMALE}>
                    {config.data.mappingGenderKeyToName[USER_GENDER.FEMALE]}
                </Radio>
            </RadioGroup>
        )

        const skillsets = this.getSkillsets()
        const skillset_fn = getFieldDecorator('skillset', {
            rules: [],
            initialValue: user.profile.skillset || []
        })

        const skillset_el = (
            <TreeSelect treeData={skillsets} treeCheckable={true} searchPlaceholder={I18N.get('select.placeholder')}/>
        )

        const professions = this.getProfessions()
        const profession_fn = getFieldDecorator('profession', {
            rules: [],
            initialValue: user.profile.profession || ''
        })

        const profession_el = (
            <Select placeholder={I18N.get('select.placeholder')}
                // Fix select dropdowns in modals
                // https://github.com/vazco/uniforms/issues/228
                getPopupContainer={x => {
                    while (x && x.tagName.toLowerCase() !== 'form') {
                        x = x.parentElement;
                    }

                    return x;
                }}>

                {_.map(professions, (profession) =>
                    <Select.Option key={profession} value={profession}>
                        {I18N.get(`profile.profession.${profession}`)}
                    </Select.Option>
                )}
            </Select>
        )

        const country_fn = getFieldDecorator('country', {
            rules: [{required: true, message: I18N.get('from.UserEditForm.country.required')}],
            initialValue: user.profile.country
        })
        const country_el = (
            <Select showSearch
                suffixIcon={<img className="circle-down-arrow" src="/assets/images/emp35/down_arrow.png"/>}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                placeholder="Country"
                // Fix select dropdowns in modals
                // https://github.com/vazco/uniforms/issues/228
                getPopupContainer={x => {
                    while (x && x.tagName.toLowerCase() !== 'form') {
                        x = x.parentElement;
                    }

                    return x;
                }}>
                {_.entries(config.data.mappingCountryCodeToName).map(([key, val]) => {
                    return <Select.Option key={key} value={key}>
                        {val}
                    </Select.Option>
                })}
            </Select>
        )

        const walletAddress_fn = getFieldDecorator('walletAddress', {
            rules: [
                {len: 34, message: I18N.get('from.UserEditForm.walletAddress.len')}
            ],
            initialValue: user.profile.walletAddress
        })
        const walletAddress_el = (
            <Input />
        )

        const timezone_fn = getFieldDecorator('timezone', {
            rules: [],
            initialValue: user.profile.timezone
        })

        const timezone_el = (
           <TimezonePicker
                className="timezone-picker"
                inputProps={{
                   placeholder: I18N.get('from.UserEditForm.timezone.placeholder')
                }}
            />
        )

        const portfolio_fn = getFieldDecorator('portfolio', {
            rules: [],
            initialValue: user.profile.portfolio
        })

        const portfolio_el = (
            <Input placeholder={I18N.get('profile.portfolio.placeholder')} />
        )

        const skillsDetails_fn = getFieldDecorator('skillsDetails', {
            rules: [],
            initialValue: user.profile.skillsDetails
        })

        const skillsDetails_el = (
            <Input placeholder={I18N.get('profile.skillsDetails.placeholder')} />
        )

        /*
        ****************************************************************************************
        * Social Media
        ****************************************************************************************
         */
        const telegram_fn = getFieldDecorator('telegram', {
            rules: [
                {min: 4, message: I18N.get('from.UserEditForm.telegram.min')}
            ],
            initialValue: user.profile.telegram
        })
        const telegram_el = (
            <Input />
        )

        const reddit_fn = getFieldDecorator('reddit', {
            rules: [
                {min: 4, message: I18N.get('from.UserEditForm.telegram.min')}
            ],
            initialValue: user.profile.reddit
        })
        const reddit_el = (
            <Input />
        )

        const wechat_fn = getFieldDecorator('wechat', {
            rules: [
                {min: 4, message: I18N.get('from.UserEditForm.telegram.min')}
            ],
            initialValue: user.profile.wechat
        })
        const wechat_el = (
            <Input />
        )

        const twitter_fn = getFieldDecorator('twitter', {
            rules: [
                {min: 4, message: I18N.get('from.UserEditForm.telegram.min')}
            ],
            initialValue: user.profile.twitter
        })
        const twitter_el = (
            <Input />
        )

        const facebook_fn = getFieldDecorator('facebook', {
            rules: [
                {min: 4, message: I18N.get('from.UserEditForm.telegram.min')}
            ],
            initialValue: user.profile.facebook
        })
        const facebook_el = (
            <Input />
        )

        const linkedin_fn = getFieldDecorator('linkedin', {
            rules: [
                {min: 4, message: I18N.get('from.UserEditForm.telegram.min')}
            ],
            initialValue: user.profile.linkedin
        })
        const linkedin_el = (
            <Input />
        )

        const github_fn = getFieldDecorator('github', {
            rules: [
                {min: 4, message: I18N.get('from.UserEditForm.telegram.min')}
            ],
            initialValue: user.profile.github
        })
        const github_el = (
            <Input placeholder={I18N.get('profile.portfolio.github')}/>
        )

        return {
            // General
            username: username_fn(username_el),
            role: role_fn(role_el),
            email: email_fn(email_el),
            password: password_fn(password_el),
            passwordConfirm: passwordConfirm_fn(passwordConfirm_el),

            firstName: firstName_fn(firstName_el),
            lastName: lastName_fn(lastName_el),
            gender: gender_fn(gender_el),
            country: country_fn(country_el),
            timezone: timezone_fn(timezone_el),
            skillset: skillset_fn(skillset_el),
            portfolio: portfolio_fn(portfolio_el),
            skillsDetails: skillsDetails_fn(skillsDetails_el),
            profession: profession_fn(profession_el),

            walletAddress: walletAddress_fn(walletAddress_el),

            // Social Media
            telegram: telegram_fn(telegram_el),
            reddit: reddit_fn(reddit_el),
            wechat: wechat_fn(wechat_el),
            twitter: twitter_fn(twitter_el),
            facebook: facebook_fn(facebook_el),
            linkedin: linkedin_fn(linkedin_el),
            github: github_fn(github_el),
        }
    }

    isCompleteProfileMode() {
        return this.props.completing
    }

    renderHeader() {
        return (
            <div className="uef-header">
                <h3>
                    {this.isCompleteProfileMode()
                        ? I18N.get('profile.completeProfile')
                        : I18N.get('profile.editProfile')
                    }
                </h3>
                <h4>
                    {I18N.get('profile.completeProfile.explanation')}
                </h4>
            </div>
        )
    }

    renderSectionSwitcher() {
        const section = this.state.section

        const sectionGenerator = (index, description) => {
            const activeClass = index === section
                ? 'active'
                : ''

            const doneClass = index < section
                ? 'done'
                : ''

            const fullClass = `uef-section ${activeClass} ${doneClass}`

            return (
                <div className={fullClass} onClick={() => this.setState({ section: index })}>
                    <div className="uef-section-index">
                        {index}
                    </div>
                    <div className="uef-section-description">
                        {description}
                    </div>
                </div>
            )
        }

        return (
            <Row className="uef-switcher">
                <Col span={8}>
                    {sectionGenerator(1, I18N.get('profile.editProfile.section.1'))}
                </Col>
                <Col span={8}>
                    {sectionGenerator(2, I18N.get('profile.editProfile.section.2'))}
                </Col>
                <Col span={8}>
                    {sectionGenerator(3, I18N.get('profile.editProfile.section.3'))}
                </Col>
            </Row>
        )
    }

    renderBasicSection() {
        const p = this.getInputProps()
        const formItemLayout = this.getFormItemLayout()
        const hideClass = this.state.section === 1 ? '' : 'hide'
        const contentClass = `uef-section-content ${hideClass}`

        return (
            <div className={contentClass}>
                <FormItem label={I18N.get('from.UserEditForm.label.firstName')} {...formItemLayout}>
                    {p.firstName}
                </FormItem>
                <FormItem label={I18N.get('from.UserEditForm.label.lastName')} {...formItemLayout}>
                    {p.lastName}
                </FormItem>
                <FormItem label={I18N.get('1202')} {...formItemLayout}>
                    {p.email}
                </FormItem>
                {!this.isCompleteProfileMode() &&
                    <FormItem label={I18N.get('from.UserEditForm.label.password')} {...formItemLayout}>
                        {p.password}
                    </FormItem>
                }
                {!this.isCompleteProfileMode() &&
                    <FormItem label={I18N.get('from.UserEditForm.label.confirm')} {...formItemLayout}>
                        {p.passwordConfirm}
                    </FormItem>
                }
                {this.props.is_admin &&
                    <FormItem label={I18N.get('user.edit.form.role')} {...formItemLayout}>
                        {p.role}
                    </FormItem>
                }
                <FormItem label={I18N.get('from.UserEditForm.label.gender')} {...formItemLayout}>
                    {p.gender}
                </FormItem>
                <FormItem label={I18N.get('from.UserEditForm.label.wallet')} {...formItemLayout}>
                    {p.walletAddress}
                </FormItem>
                <FormItem label={I18N.get('from.UserEditForm.label.country')} {...formItemLayout}>
                    {p.country}
                </FormItem>
                <FormItem label={I18N.get('from.UserEditForm.label.timezone')} {...formItemLayout}>
                    {p.timezone}
                </FormItem>
            </div>
        )
    }

    renderSkillsetSection() {
        const p = this.getInputProps()
        const formItemLayout = this.getFormItemLayout()
        const hideClass = this.state.section === 2 ? '' : 'hide'
        const contentClass = `uef-section-content ${hideClass}`

        return (
            <div className={contentClass}>
                <FormItem label={I18N.get('from.UserEditForm.label.skillset')} {...formItemLayout}>
                    {p.skillset}
                </FormItem>
                <FormItem label="Skills Details" {...formItemLayout}>
                    {p.skillsDetails}
                </FormItem>
                <FormItem label="Profession" {...formItemLayout}>
                    {p.profession}
                </FormItem>
                <FormItem label="Portfolio" {...formItemLayout}>
                    {p.portfolio}
                </FormItem>
                <FormItem label="GitHub" {...formItemLayout}>
                    {p.github}
                </FormItem>
            </div>
        )
    }

    renderSocialSection() {
        const p = this.getInputProps()
        const formItemLayout = this.getFormItemLayout()
        const hideClass = this.state.section === 3 ? '' : 'hide'
        const contentClass = `uef-section-content ${hideClass}`

        return (
            <div className={contentClass}>
                <FormItem label="LinkedIn" {...formItemLayout}>
                    {p.linkedin}
                </FormItem>
                <FormItem label="Telegram" {...formItemLayout}>
                    {p.telegram}
                </FormItem>
                <FormItem label="Reddit" {...formItemLayout}>
                    {p.reddit}
                </FormItem>
                <FormItem label="WeChat" {...formItemLayout}>
                    {p.wechat}
                </FormItem>
                <FormItem label="Twitter" {...formItemLayout}>
                    {p.twitter}
                </FormItem>
                <FormItem label="Facebook" {...formItemLayout}>
                    {p.facebook}
                </FormItem>
            </div>
        )
    }

    prevSection() {
        this.setState({
            section: this.state.section - 1
        })
    }

    nextSection() {
        this.setState({
            section: this.state.section + 1
        })
    }

    ord_render () {
        return (
            <div className="c_userEditFormContainer">
                {this.renderHeader()}
                {this.renderSectionSwitcher()}
                <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                    {this.renderBasicSection()}
                    {this.renderSkillsetSection()}
                    {this.renderSocialSection()}

                    <FormItem className="uef-button-row">
                        { this.state.section > 1 &&
                            <Button className="cr-btn" onClick={this.prevSection.bind(this)} loading={this.props.loading}>
                                {I18N.get('profile.previous')}
                            </Button>
                        }
                        {this.state.section > 3
                            ?
                                <Button className="cr-btn" type="primary" htmlType="submit" loading={this.props.loading}>
                                    {I18N.get('profile.save')}
                                </Button>
                            :
                                <Button className="cr-btn" onClick={this.nextSection.bind(this)} loading={this.props.loading}>
                                    {I18N.get(this.state.section === 3
                                        ? 'profile.save'
                                        : 'profile.next')
                                    }
                                </Button>
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }

}
export default Form.create()(C)
