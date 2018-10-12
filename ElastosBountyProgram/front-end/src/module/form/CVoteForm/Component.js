import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Form, Icon, Input, Button, Checkbox, Select, Row, Col, message, Steps, Modal} from 'antd'
import I18N from '@/I18N'
import _ from 'lodash';

import './style.scss'

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Step = Steps.Step;

class C extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            persist: true,
            loading : false
        }

        this.isLogin = this.props.isLogin;
        this.user = this.props.user;
    }

    ord_loading(f=false){
        this.setState({loading : f});
    }

    async handleSubmit(e) {
        e.preventDefault()

        const s = this.props.static;
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log(' ===> ', values)

                const param = {
                    title : values.title,
                    type : values.type,
                    notes : values.notes,
                    motionId : values.motionId,
                    isConflict : values.isConflict,
                    proposedBy : values.proposedBy,
                    content : values.content
                };
                var x1 = [];
                var x2 = [];
                _.each(s.voter, (n)=>{
                    const name = n.value;
                    x1.push(name+'|'+values['vote_'+name]);
                    x2.push(name+'|'+values['reason_'+name]);
                });
                param.vote_map = x1.join(',');
                param.reason_map = x2.join(',');

                console.log(param);
                this.ord_loading(true);
                if(this.props.edit){
                    try{
                        param._id = this.props.edit;
                        await this.props.updateCVote(param);
                        message.success('update success');
                        this.ord_loading(false);
                        this.props.history.push('/cvote/list');
                    }catch(e){
                        message.error(e.message);
                        this.ord_loading(false);
                    }
                    
                }
                else{
                    try{
                        await this.props.createCVote(param);
                        message.success('create success');
                        this.ord_loading(false);
                        this.props.history.push('/cvote/list');
                    }catch(e){
                        message.error(e.message);
                        this.ord_loading(false);
                    }
                    
                }
                
            }
        })
    }

    getInputProps(data) {
        const edit = this.props.edit;
        const role = this.props.user.role;
        const isAdmin = (role === 'ADMIN' || role === 'SECRETARY');

        const fullName = this.user.profile.firstName + ' ' + this.user.profile.lastName;

        const dis = {};
        const dis1 = {};
        const dis2 = {};
        if(!isAdmin){
            dis.disabled = true;
        }
        else{
            if(edit && (data.createdBy !== this.user.current_user_id || _.includes(['FINAL', 'DEFERRED'], data.status))){
                dis1.disabled = true;
            }
        }

    
        

        const s = this.props.static;
        const {getFieldDecorator} = this.props.form;
        const type_fn = getFieldDecorator('type', {
            rules: [{required: true}],
            disabled: true,
            initialValue: edit ? parseInt(data.type, 10) : ''
        })
        const type_el = (
            <Select size="large" {...dis} {...dis1}>
                {/* <Select.Option key={-1} value={-1}>please select type</Select.Option> */}
                {
                    _.map(s.select_type, (item, i)=>{
                        return (
                            <Select.Option key={i} value={item.code}>{item.name}</Select.Option>
                        );
                    })
                }
            </Select>
        );

        const title_fn = getFieldDecorator('title', {
            rules : [{required : true}],
            initialValue : edit ? data.title : ''
        });
        const title_el = (
            <Input {...dis} {...dis1} size="large" type="text" />
        );

        const content_fn = getFieldDecorator('content', {
            rules : [{required : true}],
            initialValue : edit ? data.content : ''
        });
        const content_el = (
            <TextArea {...dis} {...dis1} rows={6}></TextArea>
        );

        const proposedBy_fn = getFieldDecorator('proposedBy', {
            rules : [{required : true}],
            initialValue : edit ? data.proposedBy : fullName
        });
        const proposedBy_el = (
            <Select {...dis} {...dis1} size="large">
                {/* <Select.Option key={-1} value={-1}>please select</Select.Option> */}
                {
                    _.map(s.voter, (item, i)=>{
                        return (
                            <Select.Option key={i} value={item.value}>{item.value}</Select.Option>
                        );
                    })
                }
            </Select>
        );

        const motionId_fn = getFieldDecorator('motionId', {
            initialValue : edit ? data.motionId : ''
        });
        const motionId_el = (
            <Input {...dis} {...dis1} size="large" type="text" />
        );

        const vtt = {};
        _.each(s.voter, (item)=>{
            const name = item.value;

            let tmp = {};
            // if(edit && fullName !== name && data.createdBy !== this.user.current_user_id){
            if(fullName !== name){
                tmp.disabled = true;
            }
            
            const fn = getFieldDecorator('vote_'+name, {
                initialValue : edit ? data.vote_map[name] : (fullName !== name ? '-1' : 'support')
            });
            const el = (
                <Select {...dis} {...tmp} size="large">
                    <Select.Option key={'-1'} value={'-1'}>please select</Select.Option>
                    {
                        _.map(s.select_vote, (item, i)=>{
                            return (
                                <Select.Option key={i} value={item.value}>{item.name}</Select.Option>
                            );
                        })
                    }
                </Select>
            );
            vtt['vote_'+name] = fn(el);
        });

        const vts = {};
        _.each(s.voter, (item)=>{
            const name = item.value;

            let tmp = {};
            // if(edit && fullName !== name && data.createdBy !== this.user.current_user_id){
            if(fullName !== name){
                tmp.disabled = true;
            }

            const fn = getFieldDecorator('reason_'+name, {
                initialValue : edit ? data.reason_map[name] : '',
                rules : [
                    {},
                    {
                        validator : (rule, value, callback)=>{
                            const form = this.props.form;
                            const tmp = form.getFieldValue('vote_'+name);
                            if(tmp === 'reject' && !value){
                                callback('please input your reject reason');
                            }
                            else{
                                callback();
                            }
                            
                        }
                    }
                ]
                
            });
            const el = (
                <TextArea {...dis} {...tmp} rows={4}></TextArea>
            );
            vts['reason_'+name] = fn(el);
        });

        const isConflict_fn = getFieldDecorator('isConflict', {
            initialValue : edit ? data.isConflict : 'NO'
        });
        const isConflict_el = (
            <Select {...dis} {...dis1} size="large">
                <Select.Option value={'NO'}>NO</Select.Option>
                <Select.Option value={'YES'}>YES</Select.Option>
            </Select>
        );
        
        const notes_fn = getFieldDecorator('notes', {
            initialValue : edit ? data.notes : ''
        });
        const notes_el = (
            <TextArea {...dis} rows={4}></TextArea>
        );

        return {
            type : type_fn(type_el),
            title : title_fn(title_el),
            content : content_fn(content_el),
            proposedBy : proposedBy_fn(proposedBy_el),
            motionId : motionId_fn(motionId_el),
            ...vtt,
            ...vts,
            isConflict : isConflict_fn(isConflict_el),
            notes : notes_fn(notes_el)
        }
    }

    togglePersist() {
        this.setState({persist: !this.state.persist})
    }

    ord_render() {
        let p = null;
        if(this.props.edit && !this.props.data){
            return null;
        }
        if(this.props.edit && this.props.data){
            p = this.getInputProps(this.props.data);
        }
        else{
            p = this.getInputProps();
        }
        const s = this.props.static;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12}
            },
        }
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="c_loginForm">
                <h2>
                    Cyber Republic Council Members Proposal Form
                </h2>

                <h5>
                    Cyber Republic Council members can use this form to propose motion. All Cyber Republic citizen can view and share their own idea (offline). All proposals will be discussed in regular council meetings. All results will be disclosed to the public. This is a temporary solution before our Cyber Republic website has such a feature.
                </h5>

                <Row>
                    <Col offset={6} span={12}>
                        {this.renderVoteStep(this.props.data)}
                    </Col>
                </Row>
                <FormItem style={{marginTop: '24px'}} label="Title" {...formItemLayout}>{p.title}</FormItem>
                <FormItem label="Type" {...formItemLayout}>{p.type}</FormItem>
                
                <FormItem label="Content" {...formItemLayout}>{p.content}</FormItem>
                <FormItem label="Proposed by" {...formItemLayout}>{p.proposedBy}</FormItem>

                <FormItem style={{'marginBottom':'30px'}} label='Motion' help='If this is a motion against existing motion, refer to existing motion #' {...formItemLayout}>{p.motionId}</FormItem>

                {
                    _.map(s.voter, (item, i)=>{
                        const name = item.value;
                        return (
                            <FormItem key={i} label={`Online Voting by ${name}`} {...formItemLayout}>{p['vote_'+name]}</FormItem>
                        );
                    })
                }

                {
                    _.map(s.voter, (item, i)=>{
                        const name = item.value;
                        return (
                            <FormItem key={i} label={`Reasons from ${name} if against`} {...formItemLayout}>{p['reason_'+name]}</FormItem>
                        );
                    })
                }

                <FormItem style={{'marginBottom':'12px'}} label="Conflict?" help="Is this proposal potentially conflict with existing constitution?" {...formItemLayout}>{p.isConflict}</FormItem>
                <FormItem label="Notes from Secretary" {...formItemLayout}>{p.notes}</FormItem>
                
                <Row>
                    <Col offset={6} span={12}>
                        {this.renderSubmitButton()}
                        {this.renderFinishButton()}
                        {this.renderUpdateNoteButton()}
                    </Col>
                </Row>
                
                
            </Form>
        )
    }

    renderUpdateNoteButton(){
        const edit = this.props.edit;
        const role = this.props.user.role;
        const data = this.props.data;
        if(edit && this.isLogin && role === 'SECRETARY' && _.includes(['FINAL', 'DEFERRED'], data.status)){
            return (
                <FormItem style={{marginTop:40}}>
                    <Button loading={this.state.loading} onClick={this.updateNote.bind(this, data._id)} size="large" type="ebp" className="d_btn">
                        Update Notes
                    </Button>
                </FormItem>
            );
        }
        return null;
    }

    updateNote(id){
        const notes = this.props.form.getFieldValue('notes');
        this.ord_loading(true);
        this.props.updateNotes({
            _id : id,
            notes
        }).then(()=>{
            message.success('update notes success!');
            this.ord_loading(false);
        }).catch((e)=>{
            message.error(e.message);
            this.ord_loading(false);
        })
    }

    renderSubmitButton(){
        const edit = this.props.edit;
        const role = this.props.user.role;
        const data = this.props.data;
        if(!this.isLogin || !_.includes(['ADMIN', 'SECRETARY'], role)){
            return (
                <h4 style={{color:'#f00'}}>Only Council Member could create or edit proposal.</h4>
            );
        }
        else if(this.isLogin && edit && _.includes(['FINAL', 'DEFERRED'], data.status)){
            return null;
        }
        else{
            return (
                <FormItem>
                    <Button loading={this.state.loading} size="large" type="ebp" htmlType="submit" className="d_btn">
                        {edit ? 'Save' : 'Submit'}
                    </Button>
                </FormItem>
            )
        }
    }
    renderFinishButton(){
        const edit = this.props.edit;
        const role = this.props.user.role;
        const data = this.props.data;
        if(edit && this.isLogin && role === 'SECRETARY' && data.status !== 'FINAL'){
            return (
                <FormItem style={{marginTop:40}}>
                    <Button loading={this.state.loading} onClick={this.finishClick.bind(this, data._id)} size="large" type="ebp" className="d_btn">
                        Complete this proposal
                    </Button>
                </FormItem>
            );
        }
        return null;
    }
    finishClick(id){
        Modal.confirm({
            title: 'Are you sure to complete this proposal?',
            content: '',
            okText: 'Confirm',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: ()=>{
                this.ord_loading(true);
                this.props.finishCVote({
                    id : id
                }).then(()=>{
                    message.success('complete proposal success!');
                    this.ord_loading(false);
                    this.props.history.push('/cvote/list');
                }).catch((e)=>{
                    message.error(e.message);
                    this.ord_loading(false);
                })
            },
            onCancel(){
            }
        })
    }

    renderVoteStep(data){
        if(!this.props.edit){
            return null;
        }

        const s = this.props.static;
        let n = 0;
        let en = 0;
        let an = 0;
        let status = 'process';
        let ss = data.status || 'processing...';
        _.each(s.voter, (item)=>{
            const name = item.value;
            if(data.vote_map[name] === 'support'){
                n++;
            }
            else if(data.vote_map[name] === 'reject'){
                en++;
            }
            else{
                an++;
            }
        });
        if(an > 0){
            
        }
        else if(en > 1){
            status = 'error';
            // ss = 'not pass'
        }
        
        if(n > 1){
            status = 'finish';
            // ss = 'pass'
        } 

        const sy = {
            a : {
                width : '100%',
                border : '1px solid #cdd',
                height : 32,
                flex : 1,
                display : 'flex',
                background : '#eee'
            },
            b : {
                flex : 1,
                display : 'flex',
                borderRight : '1px solid #ccc'
            }
        };
        const fn = (step)=>{
            const xx = step - n;
            if(n>=step){
                return {
                    background : 'green'
                }
            }
            else if(en >= xx){
                return {
                    background : '#f5222d'
                }
            }
        };
        sy.a1 = _.extend(fn(1), sy.b);
        sy.a2 = _.extend(fn(2), sy.b);
        sy.a3 = _.extend(fn(3), sy.b);
        return (
            <div>
                <h4 style={{paddingBottom:'5px'}}>vote status : {ss}</h4>
                <div style={sy.a}>
                    <div style={sy.a1}></div>
                    <div style={sy.a2}></div>
                    <div style={sy.a3}></div>
                </div>
                {/* <Steps current={status==='error'?en-1 : n-1} status={status}>
                    <Step title="" />
                    <Step title="" />
                    <Step title="" />
                </Steps> */}
            </div>
            
        );
    }
}

export default Form.create()(C)
