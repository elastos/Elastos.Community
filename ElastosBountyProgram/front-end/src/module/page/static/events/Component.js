import React from 'react'
import EmptyPage from '../../EmptyPage'
import Footer from '@/module/layout/Footer/Container'
import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table, List, Tooltip, Breadcrumb, Card } from 'antd'
const { Option, OptGroup } = Select;

import moment from 'moment/moment'
import config from '@/config'

export default class extends EmptyPage {

    state = {
        activeMonth: 6,
        activeCountry: 1,
    }

    renderMonthsElements(activeMonth) {
        let months = moment.months();
        let monthsElements = [];
        for (let i = 0; i < months.length; i++) {
            let idx = (i === activeMonth && months[i].length === 4) ? 4 : 3;
            let monthClass = i === activeMonth ? "ebp-events-month ebp-events-active-month" : "ebp-events-month";
            monthsElements.push(<span className={monthClass} key={i} onClick={(e) => this.handleMonthChange(i,e)}>{months[i].substr(0, idx)}</span>);
        }
        return monthsElements;
    }

    renderEventCard(socialEvent) {

        return (
            <Card key={socialEvent.id}
                  hoverable
                  cover={<img src={socialEvent.image} />}>
                <div className="events-card-detail">
                    <div className="events-card-time">{socialEvent.date}</div>
                    <div className="events-card-title">{socialEvent.name}</div>
                    <div className="events-card-location">{socialEvent.location}</div>
                    <div className="events-card-button-container">
                        <Button className="events-card-button">{socialEvent.going}</Button>
                    </div>
                </div>
                <div class="events-card-hashtags">
                    #melbourne #meetup
                </div>
            </Card>
        )
    }

    renderEventCards(socialEvents) {
        let eventCards = [];
        for (let i = 0; i < socialEvents.length; i++) {
            eventCards.push(this.renderEventCard(socialEvents[i]));
        }
        return eventCards;
    }

    handleMonthChange(value) {
        this.setState({
            activeMonth: value
        })
    }

    handleCountryChange(value) {
        this.setState({
            activeCountry: value
        })
    }

    ord_renderContent () {

        const Option = Select.Option;

        let socialEvent1 = {
            id: 1,
            name: "Melbourne Meetup",
            date: "Sun, 1 July 10:00am",
            location: "Melbourne, Australia",
            image: "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg",
            hashtags: "#melbourne #meetup",
            going: "Going"
        };

        let socialEvent2 = {
            id: 2,
            name: "Melbourne Meetup",
            date: "Sun, 1 July 10:00am",
            location: "Melbourne, Australia",
            image: "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg",
            hashtags: "#melbourne #meetup",
            going: "Going"
        };

        let socialEvent3 = {
            id: 3,
            name: "Melbourne Meetup",
            date: "Sun, 1 July 10:00am",
            location: "Melbourne, Australia",
            image: "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg",
            hashtags: "#melbourne #meetup",
            going: "Going"
        };

        let socialEvents = [socialEvent1, socialEvent2, socialEvent3];

        return (
            <div className="p_EVENTS">
                <div className="ebp-page">
                    <div className="ebp-events-time">
                        <Row type="flex" justify="space-between">
                            {this.renderMonthsElements(this.state.activeMonth)}
                        </Row>
                    </div>
                    <div className="ebp-events-location">
                        <Select
                            showSearch
                            className="ebp-events-country-select"
                            placeholder="Region / Country"
                            optionFilterProp="children"
                            onChange={this.handleCountryChange}
                            size="large"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <OptGroup label="America">
                                <Option value="0">New York</Option>
                                <Option value="1">Chicago</Option>
                                <Option value="2">San Diego</Option>
                            </OptGroup>
                            <OptGroup label="Europe">
                                <Option value="3">Germany</Option>
                                <Option value="4">Austria</Option>
                                <Option value="5">Bosnia</Option>
                            </OptGroup>
                        </Select>
                    </div>
                    <Row className="d_row">
                        {this.renderEventCards(socialEvents)}
                    </Row>
                </div>
            </div>
        )
    }
}
