import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import { Link } from 'react-router-dom'
import './style.scss'
import MediaQuery from 'react-responsive'
import { Col, Row, Card, Button, Breadcrumb, Icon, List, Spin, Avatar } from 'antd'
import {MAX_WIDTH_MOBILE} from "../../../config/constant"
import _ from 'lodash'

export default class extends StandardPage {
    componentDidMount() {
        this.props.getTasks()
    }

    componentWillUnmount() {
        this.props.resetTasks()
    }

    ord_renderContent () {
        return (
            <div className="p_Cr100">
                <div className="ebp-header-divider" />
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildHeader()}
                            {this.ifNotLoading(this.buildList.bind(this))}
                            {this.buildDisclaimer()}
                            {this.buildFooter()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    buildHeader() {

    }

    ifNotLoading(followup) {
        return this.props.loading
            ? <Spin size="large"/>
            : _.isFunction(followup) && followup()
    }

    buildList() {
        // Note, the project can be in multiple domains, but categorizing by the top one
        const categorizedList = _.groupBy(this.props.all_tasks, (task) => _.first(task.domain))

        const list = _.map(categorizedList, (list, category) => {
            const sanitizedCategory = (category || 'uncategorized').toLowerCase()
            return (
                <div key={sanitizedCategory}>
                    <h3 className="brand-color">
                        {I18N.get(`team.spec.${sanitizedCategory}`)}
                    </h3>
                    <div className="c_projectList">
                        {_.map(list, (project, ind) => (
                            <div key={ind} className="c_project">
                                <Avatar shape="square" size={64} src={project.thumbnail}/>
                                <div>{project.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        })

        return (
            <div className="c_list">
                <h3>
                    Projects
                </h3>
                {list}
            </div>
        )
    }

    buildDisclaimer() {

    }

    buildFooter() {

    }
}
