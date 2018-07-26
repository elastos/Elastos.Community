import React from 'react'
import EmptyPage from '../../EmptyPage'
import './style.scss'

import {Row, Icon, Button, Spin, Dropdown, Select, Menu, Card, Tag, Cascader} from "antd";
const { Option, OptGroup } = Select;

import moment from 'moment/moment'

export default class extends EmptyPage {

    state = {
        activeMonth: 5,
        socialEvents: [],
        communityTrees: [],
        filterCommunity: [],
        user_id: "5b28f21925220612fc4ff911",
    };

    async componentDidMount() {
        const socialEvents = await this.props.getSocialEvents();
        this.setState({socialEvents: socialEvents.list});
        this.getAllCommunities();
    }

    getAllCommunities() {
        this.props.getAllCommunities().then((communityTrees) => {
            this.setState({
                communityTrees
            });
        })
    }

    handleMonthChange(month) {
        this.setState({
            activeMonth: month
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
        return (<Cascader
            value={[...this.state.filterCommunity]}
            style={{width: '250px'}}
            options={this.state.communityTrees}
            placeholder="Filter by community"
            onChange={this.handleOnChangeFilter.bind(this)}
            changeOnSelect />);
    }

    handleOnChangeFilter(value, selectedOption) {
        this.setState({
            filterCommunity: value
        })
    }

    handleRegisterUser(candidate, socialEventID) {
        /*for(let i = 0; i < this.state.socialEvents.length; i++) {
            if(this.state.socialEvents[i]._id === socialEventID) {
                let socialEvents = this.state.socialEvents;
                socialEvents[i].candidates.push(candidate);
                this.setState({
                    socialEvents: socialEvents
                });
                break;
            }
        }*/
    }

    handleUnregisterUser(candidate, socialEventID) {
        for(let i = 0; i < this.state.socialEvents.length; i++) {
            if(this.state.socialEvents[i]._id === socialEventID) {
                let socialEvents = this.state.socialEvents;
                let idx = socialEvents[i].candidates.indexOf(candidate);
                socialEvents[i].candidates.splice(idx, 1);
                this.setState({
                    socialEvents: socialEvents
                });
                break;
            }
        }
        console.log(this.state.socialEvents);
    }

    renderDropDownMenu(candidate, socialEventID) {
        const actionButtonLabel = candidate ? "Going" : "Register";
        const seeMoreLabel = "See more";
        const notGoingLabel = "Not going";
        const menuItemSeeMore = <Menu.Item key="1" onClick={() => this.props.history.push(`/event/`)}>{seeMoreLabel}</Menu.Item>;

        const menuGoing = (
            <Menu>
                {menuItemSeeMore}
                <Menu.Item key="2" onClick={() => this.handleUnregisterUser(candidate, socialEventID)}>{notGoingLabel}</Menu.Item>
            </Menu>
        );
        const menuRegister = (
            <Menu>
                {menuItemSeeMore}
            </Menu>
        );

        let actionButtonClass = "events-card-button-" + (candidate ? "going" : "register");
        const menu = candidate ? menuGoing : menuRegister;
        return (<Dropdown overlay={menu} key={1}>
                    <Button className={actionButtonClass} onClick={() => this.handleRegisterUser(candidate, socialEventID)}>
                        {actionButtonLabel} <Icon type="down"/>
                    </Button>
                </Dropdown>);
    }

    renderHashTags(hashTags) {
        let elements = [];
        for (let i = 0; i < hashTags.length; i++) {
            elements.push(<Tag key={i}>{hashTags[i]}</Tag>);
        }
        return elements;
    }

    renderEventCard(socialEvent) {
        console.log(socialEvent.candidates);
        let candidate = socialEvent.candidates.find((user) => user.user._id === this.state.user_id);
        let hashTags = ["#4ever", "#elastos"];
        let image = socialEvent.attachment ? socialEvent.attachment :
            "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg";
        let date = socialEvent.startTime ? moment(socialEvent.startTime).format("MMMM Do YYYY. h:mm a") : "To Be Determined";
        let community = socialEvent.community ? socialEvent.community.name : "-";

        return (
            <Card key={socialEvent._id}
                  cover={<img className="event-card-image" src={image} />}>
                <div className="events-card-detail">
                    <div className="events-card-time">{date}</div>
                    <div className="events-card-title"
                         onClick={(e) => this.props.history.push(`/event/`)}>{socialEvent.name}</div>
                    <div className="events-card-location">{community}</div>
                    <div className="events-card-button-container">
                        {this.renderDropDownMenu(candidate, socialEvent._id)}
                    </div>
                </div>
                <div class="events-card-hashtags">
                    {this.renderHashTags(hashTags)}
                </div>
            </Card>
        )
    }

    renderEventCards(socialEvents) {

        if(socialEvents.length === 0) {
            const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
            return (<Spin className="events-spinner" indicator={antIcon} size="large"/>);
        }

        let eventCards = [];
        const filteredSocialEvents = socialEvents.filter((item) => {
            let dateValid = item.startTime ? new Date(item.startTime).getMonth() === this.state.activeMonth : true;
            if(this.state.filterCommunity.length === 0) {
                return dateValid;
            }
            else if(!item.community) {
                return dateValid && this.state.filterCommunity.length === 0;
            }

            let communityValid = false;
            if(this.state.filterCommunity.length > 1) {
                if (item.community._id === this.state.filterCommunity[1]) {
                    communityValid = true;
                    return dateValid && communityValid;
                }
                return false;
            } else if(this.state.filterCommunity[0] === item.community._id) {
                communityValid = true;
            } else {
                let found = this.state.communityTrees.find((community) => community.value === this.state.filterCommunity[0]);
                if(found && found.children) {
                    for(let j = 0; j < found.children.length; j++) {
                        if(found.children[j].value === item.community._id) {
                            communityValid = true;
                            return dateValid && communityValid;
                        }
                    }
                }
            }
            return dateValid && communityValid;
        });
        for (let i = 0; i < filteredSocialEvents.length; i++) {
            eventCards.push(this.renderEventCard(filteredSocialEvents[i]));
        }
        if(eventCards.length === 0) {
            eventCards.push(<div className="no-events" key={1}>No events found</div>);
        }
        return eventCards;
    }

    ord_renderContent () {
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
