import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import { Link } from 'react-router-dom'
import config from '@/config'
import _ from 'lodash'
import './style.scss'
import I18N from '@/I18N'

import { Breadcrumb, Col, Row, Icon, Form, Input, Button, Modal, Select,
    Table, List, Popover, Cascader, Tabs, Tree, Divider } from 'antd'
import moment from 'moment/moment'

// /////////////////
// Constant
// /////////////////

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

// /////////////////
// Data: Dummy
// /////////////////

const TABS = [{ id: 1, title: 'Getting Started' }, { id: 2, title: 'Tutorial' }, { id: 3, title: 'Smart Contracts' }, { id: 4, title: 'Training' }];
const CONTENTS = [
    {
        tabID: 1,
        content: [
            {
                id: 1,
                topic: 'Introduction',
                detail: 'bal bal bal bla',
                children: []
            },
            {
                id: 2,
                topic: 'Basic',
                detail: 'introduction to basics',
                children: [
                    {
                        id: 3,
                        topic: 'How to use Ark Explore',
                        detail: 'How to use Ark Explore',
                        children: []
                    },
                    {
                        id: 4,
                        topic: 'How to use Desktop Wallet',
                        detail: 'How to use Desktop Wallet',
                        children: []
                    },
                    {
                        id: 5,
                        topic: 'How to use Mobile Wallet',
                        detail: 'How to use Mobile Wallet',
                        children: []
                    }
                ]

            }

        ]
    },
    {
        tabID: 2,
        content: [
            {
                id: 1,
                topic: 'tutorial',
                detail: 'what is smartcontract. Well, it is exactly what it means. s the inverse(DumbContract).',
                children: []
            }
        ]
    },
    {
        tabID: 3,
        content: [
            {
                id: 1,
                topic: 'intro',
                detail: 'bal bal bal bla',
                children: []
            }
        ]
    },
    {
        tabID: 4,
        content: [
            {
                id: 1,
                topic: 'intro',
                detail: 'bal bal bal bla',
                children: []
            }
        ]
    }
]

// /////////////////
// Function:
// /////////////////

const isEmpty = ([first, ...rest]) => first === undefined;

// TopicDetail: displays the detail of a topic
class TopicDetail extends React.Component {
    constructor(p) {
        super(p);
        this.p = p;
    }

    render() {
        return (
            <div>
                <article>
                    {<p>A new technology made possible by public blockchains, smart contracts are difficult to understand because the term partly confuses the core interaction described.</p>}
                </article>
                <footer>
                    <Row>
                        <Col span={12}><a href="#" title="Submit feedback.">Help us improve this page.</a></Col>
                        <Col span={12}>Last Updated: 07/07/2018</Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}><a href="#" title="Next topic">Next topic</a></Col>
                    </Row>
                </footer>
            </div>
        );
    }
}

// Topics: produces cateogries and topics
class Topics extends React.Component {
    constructor(p) {
        super(p);
        this.p = p;
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    buildTreeNodes(paneContent) {

        // consumes a node data
        // produces a leafnode
        const buildLeafNode = (n) =>
            (<TreeNode title={n.topic} key={paneContent.tabID + '-' + n.id} />);

        const buildNodeNode = (n) => {
            const childNodes = n.children.map(el => buildLeafNode(el));
            return (<TreeNode title={n.topic} key={n.id}>
                {childNodes};
            </TreeNode>);
        }

        return paneContent.content.map(el => {
            return isEmpty(el.children) ? buildLeafNode(el) : buildNodeNode(el);
        });

    }

    render() {
        const paneContent = this.p.paneContent;
        return (
            <div>
                <Tree onSelect={this.onSelect} showLine defaultExpandAll >
                    {this.buildTreeNodes(paneContent)}
                </Tree>
            </div>
        );
    }
}

// LearningContent: produces layout for each tab
// TODO: add condition to only load conents for tabs
//       that already have content.
class LearningContent extends React.Component {

    constructor(p) {
        super(p);
        this.p = p;
    }

    // getContentByTabID: consumes tabID, content
    // produces the content for tabID
    getContentByTabID(tabID, contents) {
        return contents.find(el => el.tabID === tabID);
    }

    render() {
        const paneContent = this.getContentByTabID(this.p.tab.id, CONTENTS);
        return (
            <Row gutter={16}>
                <Col span={6}><Topics paneContent={paneContent} /></Col>
                <Col span={18}><TopicDetail paneContent={paneContent} /></Col>
            </Row>
        );
    }
}

// OptionTab: produces tabs with LearningContent on tab
class OptionTab extends React.Component {

    constructor(p) {
        super(p);
        this.p = p;
    }

    // buildTab consumes a list of tab-setting objects;
    // it produces a list of TabPanes
    buildTab(tabs) {
        return tabs.map((el, i = 0) =>
            <TabPane tab={el.title} key={(i + 1).toString()}>
                <LearningContent tab={el} />
            </TabPane>
        );
    }

    render() {
        return (
            <Tabs defaultActiveKey={this.p.defaultActiveKey} type={'card'}>
                {this.buildTab(this.p.tabs)}
            </Tabs>
        );
    }
}

// /////////////////
// Function: main
// /////////////////
export default class extends StandardPage {
    state = {
    }
    ord_renderContent() {
        return (
            <div className="p_DeveloperLearn">
                <Breadcrumb className="p_admin_breadcrumb">
                    <Breadcrumb.Item><Icon type="home"/></Breadcrumb.Item>
                    <Breadcrumb.Item>{I18N.get('developer.breadcrumb.developers')}</Breadcrumb.Item>
                    <Breadcrumb.Item>{I18N.get('developer.learn')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            <Row className="d_row d_rowTop">
                                <Col span={24}>
                                    <OptionTab tabs={TABS} defaultActiveKey="1" />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

// /////////////////
// Test
// /////////////////
