import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { Col, Row, Icon, Input, Button, Breadcrumb, List, Checkbox, Radio, Carousel } from 'antd'
import _ from 'lodash'
import './style.scss'
import moment from 'moment/moment'
import {SKILLSET_TYPE, TEAM_TASK_DOMAIN} from '@/constant'

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class extends BaseComponent {
    componentDidMount() {
        this.props.getTeams()
    }

    componentWillUnmount() {
        this.props.resetTeams()
    }

    ord_states() {
        return {
            lookingFor: 0,
            skillset: [0],
            category: [0],
            entryCount: 3,
            skillsetShowAllEntries: false,
            categoryShowAllEntries: false
        }
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
        for (let i = 0; i < lookingForOptions.length
            && (i < this.state.entryCount || this.state.skillsetShowAllEntries); i++) {
            elements.push(<Radio className="radio" value={i} key={i}>{lookingForOptions[i]}</Radio>);
        }

        return(
            <RadioGroup onChange={this.onChangeLookingFor.bind(this)} value={this.state.lookingFor}>
                {elements}
            </RadioGroup>
        );
    }

    renderSkillset(skillsetOptions, showAll) {
        const limit = this.state.entryCount
        const filtered = _.take(skillsetOptions, showAll ? skillsetOptions.length : limit)
        const elements = _.map(filtered, (option) => {
            return (
                <div className="checkbox" key={option.value}>
                    <Checkbox value={option.value}>
                        {option.label}
                    </Checkbox>
                </div>
            );
        })

        return (
            <CheckboxGroup onChange={this.onChangeSkillset.bind(this)}>
                {elements}
            </CheckboxGroup>
        );
    }

    renderCategory(categoryOptions, showAll) {
        const limit = this.state.entryCount
        const filtered = _.take(categoryOptions, showAll ? categoryOptions.length : limit)
        const elements = _.map(filtered, (option) => {
            return (
                <div className="checkbox" key={option.value}>
                    <Checkbox value={option.value}>
                        {option.label}
                    </Checkbox>
                </div>
            )
        })

        return (
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

    renderMain() {
        const lookingForOptions = ['Team', 'Project'];
        const skillsetOptions = [
            {
                label: 'C++',
                value: SKILLSET_TYPE.CPP
            },
            {
                label: 'JavaScript',
                value: SKILLSET_TYPE.JAVASCRIPT
            },
            {
                label: 'Go',
                value: SKILLSET_TYPE.GO
            },
            {
                label: 'Python',
                value: SKILLSET_TYPE.PYTHON
            }
        ]
        const categoryOptions = [
            {
                label: 'Social',
                value: TEAM_TASK_DOMAIN.SOCIAL
            },
            {
                label: 'IoT',
                value: TEAM_TASK_DOMAIN.IOT
            },
            {
                label: 'Media',
                value: TEAM_TASK_DOMAIN.MEDIA
            },
            {
                label: 'Finance',
                value: TEAM_TASK_DOMAIN.FINANCE
            }
        ]
        const lookingForElement = this.renderLookingFor(lookingForOptions);
        const skillsetElement = this.renderSkillset(skillsetOptions, this.state.skillsetShowAllEntries);
        const categoryElement = this.renderCategory(categoryOptions, this.state.categoryShowAllEntries);

        return (
            <div className="c_Search">
                <Row className="d_row">
                    <Col span={4} className="admin-left-column wrap-box-user">
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
                        {this.renderList()}
                    </Col>
                </Row>
            </div>
        )
    }

    ord_render () {
        return this.renderMain()
    }

    getCarousel(item) {
        const pictures = _.map(item.pictures, (picture, ind) => {
            return (
                <div key={ind}>
                    <img width={204} height={204} alt="logo" src={picture.url} />
                </div>
            )
        })

        return (
            <div className="carousel-wrapper">
                <Carousel autoplay>
                    {pictures}
                </Carousel>
            </div>
        )
    }

    renderList() {
        const teams = this.props.all_teams

        console.log('   # teams ', teams)

        const data = _.map(teams, (team, id) => {
            return {
                href: '',
                title: team.name,
                pictures: team.pictures || [],
                description: 'Lorem ipsum',
                content: team.profile.description,
                id: team._id
            }
        })

        return (
            <List loading={this.props.loading} itemLayout='vertical' size='large'
                pagination={{ pageSize: 5 }} dataSource={data} renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={this.getCarousel(item)}
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
}
