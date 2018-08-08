import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import {Col, Row, Icon, Input, Button, Breadcrumb, List, Checkbox, Radio, Carousel, Modal} from 'antd'
import _ from 'lodash'
import './style.scss'
import moment from 'moment/moment'
import {SKILLSET_TYPE, TEAM_TASK_DOMAIN} from '@/constant'
import ProjectDetail from '@/module/project/detail/Container'
import Footer from '@/module/layout/Footer/Container'

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class extends BaseComponent {
    componentDidMount() {
        this.props.getTeams()
    }

    componentWillUnmount() {
        this.props.resetTeams()
        this.props.resetTasks()
    }

    ord_states() {
        return {
            lookingFor: 'TEAM',
            skillset: [],
            domain: [],
            entryCount: 3,
            skillsetShowAllEntries: false,
            categoryShowAllEntries: false,
            showModal: false,
        }
    }

    refetch() {
        let query = {}

        if (!_.isEmpty(this.state.skillset)) {
            query.skillset = this.state.skillset
        }

        if (!_.isEmpty(this.state.domain)) {
            query.domain = this.state.domain
        }

        const getter = this.isLookingForTeam()
            ? this.props.getTeams
            : this.props.getTasks

        getter.call(this, query)
    }

    isLookingForTeam() {
        return this.state.lookingFor === 'TEAM'
    }

    onChangeLookingFor(e) {
        this.setState({
            lookingFor: e.target.value
        }, this.refetch.bind(this));
    }

    onChangeSkillset(value) {
        this.setState({
            skillset: value
        }, this.refetch.bind(this))
    }

    onChangeDomain(value) {
        this.setState({
            domain: value
        }, this.refetch.bind(this))
    }

    showModal = () => {
        this.setState({
            showModal: true,
        })
    }

    handleModalOk = (e) => {
        this.setState({
            showModal: false,
        })
    }

    handleModalCancel = (e) => {
        this.setState({
            showModal: false,
        })
    }

    renderLookingFor(lookingForOptions, showAll) {
        const limit = this.state.entryCount
        const filtered = _.take(lookingForOptions, showAll ? lookingForOptions.length : limit)
        const elements = _.map(filtered, (option) => {
            return (
                <Radio className="radio" value={option.value} key={option.value}>{option.label}</Radio>
            )
        })

        return (
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
            <CheckboxGroup onChange={this.onChangeDomain.bind(this)}>
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
        const lookingForOptions = [
            {
                label: 'Team',
                value: 'TEAM'
            },
            {
                label: 'Project',
                value: 'PROJECT'
            }
        ]
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
        const lookingForElement = this.renderLookingFor(lookingForOptions, true);
        const skillsetElement = this.renderSkillset(skillsetOptions, this.state.skillsetShowAllEntries);
        const categoryElement = this.renderCategory(categoryOptions, this.state.categoryShowAllEntries);

        return (
            <div className="c_Search">
                <Row className="d_row">
                    <Col span={4} className="admin-left-column wrap-box-user">
                        <Input.Search placeholder="Search"/>
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
                <Modal
                    title="Basic Modal"
                    visible={this.state.showModal}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    footer={null}
                    width="80%"
                >
                    <ProjectDetail task={this.props.task}/>
                </Modal>
                <Footer/>
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

    showActivityOverview() {
        this.setState({
            showActivityOverview: true
        })
    }

    renderList() {
        const entities = this.isLookingForTeam()
            ? this.props.all_teams
            : this.props.all_tasks

        const data = this.isLookingForTeam()
            ? _.map(entities, (team, id) => {
                return {
                    href: '',
                    title: team.name,
                    pictures: team.pictures || [],
                    description: 'Lorem ipsum',
                    content: team.profile.description,
                    id: team._id
                }
            })
            : _.map(entities, (task, id) => {
                return {
                    href: '',
                    title: task.name,
                    pictures: task.pictures || [],
                    description: 'Lorem ipsum',
                    content: task.description,
                    id: task._id
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
                            title={<a onClick={this.showModal.bind(this)}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        )
    }
}
