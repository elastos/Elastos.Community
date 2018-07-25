import React from 'react'
import EmptyPage from '../../EmptyPage'
import './style.scss'

import { Row, Icon, Button, Dropdown, Select, Menu, Card, Tag } from 'antd'
const { Option, OptGroup } = Select;

import moment from 'moment/moment'

export default class extends EmptyPage {

    state = {
        activeMonth: 8,
        activeCountry: undefined,
        socialEvents: [],
        communityTree: { }
    }

    async componentDidMount() {
        const events = await this.props.getSocialEvents();
        const community = await this.props.getCommunityTree();
        this.setState({socialEvents: events});
        this.setState({communityTree: community});
    }

    handleMonthChange(month) {
        this.setState({
            activeMonth: month
        })
    }

    handleCountryChange(country) {
        this.setState({
            activeCountry: country
        })
    }

    renderMonthsElements() {
        let months = moment.months();
        let monthsElements = [];
        for (let i = 0; i < months.length; i++) {
            let idx = (i === this.state.activeMonth && months[i].length === 4) ? 4 : 3;
            let monthClass = i === this.state.activeMonth ? "ebp-events-month ebp-events-active-month" : "ebp-events-month";
            monthsElements.push(<span className={monthClass} key={i} onClick={(e) => this.handleMonthChange(i,e)}>{months[i].substr(0, idx)}</span>);
        }
        return monthsElements;
    }

    renderCommunityDropDown() {
        let ele = [];
        let i = 0;
        let j = 0;
        for(let region in this.state.communityTree) {
            let options = [];
            for(let community in this.state.communityTree[region]) {
                options.push(<Option value={this.state.communityTree[region][community]} key={j}>{this.state.communityTree[region][community]}</Option>);
                j++;
            }
            ele.push(<OptGroup label={region.toUpperCase()} key={i}>{options}</OptGroup>);
            i++;
        }

        return (
            <Select
                showSearch
                className="ebp-events-country-select"
                placeholder="Region / Country"
                optionFilterProp="children"
                onChange={(e) => this.handleCountryChange(e)}
                size="large"
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {ele}
            </Select>);
    }

    renderDropDownMenu(isGoing, actionButtonClass) {

        const actionButtonLabel = isGoing ? "Going" : "Register";
        const seeMoreLabel = "See more";
        const notGoingLabel = "Not going";
        const menuItemSeeMore = <Menu.Item key="1" onClick={(e) => this.props.history.push(`/event/`)}>{seeMoreLabel}</Menu.Item>;

        const menuGoing = (
            <Menu>
                {menuItemSeeMore}
                <Menu.Item key="2">{notGoingLabel}</Menu.Item>
            </Menu>
        );
        const menuRegister = (
            <Menu>
                {menuItemSeeMore}
            </Menu>
        );

        const menu = isGoing ? menuGoing : menuRegister;
        let dropDownMenu = [];
        dropDownMenu.push(<Dropdown overlay={menu} key={1}>
                            <Button className={actionButtonClass}>
                                {actionButtonLabel} <Icon type="down"/>
                            </Button>
                        </Dropdown>);
        return dropDownMenu;
    }

    renderHashTags(hashTags) {
        let elements = [];
        for (let i = 0; i < hashTags.length; i++) {
            elements.push(<Tag key={i}>{hashTags[i]}</Tag>);
        }
        return elements;
    }

    renderEventCard(socialEvent) {
        let actionButtonClass = "events-card-button-" + (socialEvent.going ? "going" : "register");
        return (
            <Card key={socialEvent.id}
                  cover={<img src={socialEvent.image} />}>
                <div className="events-card-detail">
                    <div className="events-card-time">{moment(socialEvent.date).format("MMMM Do YYYY. h:mm a")}</div>
                    <div className="events-card-title"
                         onClick={(e) => this.props.history.push(`/event/`)}>{socialEvent.name}</div>
                    <div className="events-card-location">{socialEvent.location}</div>
                    <div className="events-card-button-container">
                        {this.renderDropDownMenu(socialEvent.going, actionButtonClass)}
                    </div>
                </div>
                <div class="events-card-hashtags">
                    {this.renderHashTags(socialEvent.hashTags)}
                </div>
            </Card>
        )
    }

    renderEventCards(socialEvents) {
        let eventCards = [];
        const filteredSocialEvents = socialEvents.filter((item) => {
                let dateValid = item.date.getMonth() == this.state.activeMonth;
                let communityValid = false;
                if(this.state.activeCountry && item.location[1] === this.state.activeCountry) {
                    communityValid = true;
                } else if(!this.state.activeCountry) {
                    communityValid = true;
                }
                return dateValid && communityValid;
            });
        for (let i = 0; i < filteredSocialEvents.length; i++) {
            eventCards.push(this.renderEventCard(filteredSocialEvents[i]));
        }
        return eventCards;
    }

    /*
    <Select
                            showSearch
                            className="ebp-events-country-select"
                            placeholder="Region / Country"
                            optionFilterProp="children"
                            onChange={this.handleCountryChange}
                            size="large"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {this.renderCommunityDropDown()}
                        </Select>

     */
    ord_renderContent () {

        const Option = Select.Option;
        return (
            <div className="p_EVENTS">
                <div className="ebp-page">
                    <div className="ebp-events-time">
                        <Row type="flex" justify="space-between">
                            {this.renderMonthsElements()}
                        </Row>
                    </div>
                    <div className="ebp-events-location">
                        {this.renderCommunityDropDown()}
                    </div>
                    <Row className="d_row">
                        {this.renderEventCards(this.state.socialEvents)}
                    </Row>
                </div>
            </div>
        )
    }
}
