import React from 'react'
import StandardPage from '../../StandardPage'
import { Link } from 'react-router-dom'
import config from '@/config'
import _ from 'lodash'
import './style.scss'

import { Col, Row, Icon, Input, Button, Breadcrumb, List, Checkbox, Radio } from 'antd'
import moment from 'moment/moment'

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class extends StandardPage {
    state = {
        lookingFor: 0,
        skillset: [0],
        category: [0],
        entryCount: 4,
        skillsetShowAllEntries: false,
        categoryShowAllEntries: false,
    }

    componentDidMount() {
        super.componentDidMount()
        this.props.getTeams()
    }

    componentWillUnmount() {
        this.props.resetTeams()
    }

    onChangeLookingFor(e) {
        this.setState({
            lookingFor: e.target.value
        });
    }

    onChangeSkillset(value) {
        // [0,1 ... n]
    }

    onChangeCategory() {
        // [0,1 ... n]
    }

    renderLookingFor(lookingForOptions) {
        let elements = [];
        for(let i = 0; i < lookingForOptions.length
            && (i < this.state.entryCount || this.state.skillsetShowAllEntries); i++) {
            elements.push(<Radio className="radio" value={i} key={i}>{lookingForOptions[i]}</Radio>);
        }

        return(
            <RadioGroup onChange={this.onChangeLookingFor.bind(this)} value={this.state.lookingFor}>
                {elements}
            </RadioGroup>
        );
    }

    renderSkillset(skillsetOptions) {
        let elements = [];
        for(let i = 0; i < skillsetOptions.length
            && ( i < this.state.entryCount || this.state.skillsetShowAllEntries); i++) {
            elements.push(
                <div className="checkbox" key={i}>
                    <Checkbox value={i} key={i}>
                        {skillsetOptions[i]}
                    </Checkbox>
                </div>
            );
        }

        return(
            <CheckboxGroup onChange={this.onChangeSkillset.bind(this)}>
                {elements}
            </CheckboxGroup>
        );
    }

    renderCategory(categoryOptions) {
        let elements = [];
        for(let i = 0; i < categoryOptions.length; i++) {
            elements.push(
                <div className="checkbox" key={i}>
                    <Checkbox value={i} key={i}>
                        {categoryOptions[i]}
                    </Checkbox>
                </div>
            );
        }

        return(
            <CheckboxGroup onChange={this.onChangeCategory.bind(this)}>
                {elements}
            </CheckboxGroup>
        );
    }

    enableSkillsetEntries() {
        this.setState({
            skillsetShowAllEntries: !this.state.skillsetShowAllEntries
        });
    }

    enableCategoryEntries() {
        this.setState({
            categoryShowAllEntries: !this.state.categoryShowAllEntries
        });
    }

    ord_renderContent () {
        const lookingForOptions = ['Project', 'Team'];
        const skillsetOptions = ['C++', 'Javascript', 'Go', 'Python', 'Java'];
        const categoryOptions = ['Social', 'IoT', 'Media', 'Finance'];

        const lookingForElement = this.renderLookingFor(lookingForOptions);
        const skillsetElement = this.renderSkillset(skillsetOptions);
        const categoryElement = this.renderCategory(categoryOptions);

        return (
            <div className="p_DeveloperSearch">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-wrap">
                    <Row className="d_row d_rowTop">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home"/>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/developers">
                                    Developers
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Search
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </Row>
                    <Row className="d_row">
                        <Col span={4} className="admin-left-column wrap-box-user">
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}/>

                            <div className="group">
                                <div className="title">Looking For:</div>
                                <div className="content">
                                    {lookingForElement}
                                </div>
                            </div>

                            <div className="group">
                                <div className="title">Skillset:</div>
                                <div className="content">
                                    {skillsetElement}
                                    {skillsetOptions.length > this.state.entryCount &&
                                        <div className="showMore" onClick={this.enableSkillsetEntries.bind(this)}>
                                            {
                                                !this.state.skillsetShowAllEntries ? (<span>Show More..</span>)
                                                    : (<span>Hide</span>)
                                            }
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="group">
                                <div className="title">Category:</div>
                                <div className="content">
                                    {categoryElement}
                                    { categoryOptions.length > this.state.entryCount &&
                                        <div className="showMore" onClick={this.enableCategoryEntries.bind(this)}>
                                            {
                                                !this.state.categoryShowAllEntries ? (<span>Show More..</span>)
                                                    : (<span>Hide</span>)
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col span={20} className="admin-right-column wrap-box-user">
                            <div className="pull-right hide">
                                <Button onClick={this.goCreateTeam.bind(this)}>Create Team</Button>
                            </div>
                            {this.renderList()}
                        </Col>
                    </Row>
                    <div className="horizGap">
                    </div>
                </div>
            </div>
        )
    }

    renderList() {
        const teams = this.props.allTeams
        const data = _.map(teams, (team) => {
            return {
                href: '',
                title: team.name,
                url: team.pictures && team.pictures[0] && team.pictures[0].url,
                description: 'Lorem ipsum',
                content: team.description
            }
        })

        return (
            <List itemLayout='vertical' size='large' pagination={{ pageSize: 5 }} dataSource={data}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        extra={<img width={272} alt="logo" src={item.url} />}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        )
    }

    goCreateTeam() {

    }

    goCreateTask() {

    }
}
