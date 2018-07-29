import React from 'react'
import EmptyPage from '../../EmptyPage'
import './style.scss'
import {Row, Icon, Button, Spin, Checkbox, Card, Tag, Cascader} from "antd";
import moment from 'moment/moment'

export default class extends EmptyPage {

    state = {
        activeMonth: 5,
        socialEvents: [],
        communityTrees: [],
        filterCommunity: [],
        user_id: "5b28f21925220612fc4ff911",
        favorites: [],
        showFavoritesOnly: false
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

    navigateToEvent(socialEventID) {
        this.props.history.push(`/events/${socialEventID}`);
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
            monthsElements.push(<span className={monthClass} key={i} onClick={this.handleMonthChange.bind(this, i)}>{months[i].substr(0, idx)}</span>);
        }
        return monthsElements;
    }

    renderCommunityDropDown() {
        return (<Cascader className="community-filter"
            value={[...this.state.filterCommunity]}
            style={{width: '250px'}}
            options={this.state.communityTrees}
            placeholder="Filter by community"
            onChange={this.handleOnChangeFilter.bind(this)}
            changeOnSelect />);
    }

    onFavoriteFilterChange(value) {
        this.setState({
            showFavoritesOnly: value
        });
    }

    renderFavoritesFilter() {
        return (
            <Checkbox className="favorites-filter" onChange={() => this.onFavoriteFilterChange()}>Show only favorites</Checkbox>
        );
    }

    handleOnChangeFilter(value) {
        this.setState({
            filterCommunity: value
        })
    }

    handleRegisterUser(socialEventId) {
        this.props.subscribe(socialEventId);
    }

    handleUnregisterUser(candidate, socialEventId) {
        for(let i = 0; i < this.state.socialEvents.length; i++) {
            if(this.state.socialEvents[i]._id === socialEventId) {
                let socialEvents = this.state.socialEvents;
                let idx = socialEvents[i].candidates.indexOf(candidate);
                socialEvents[i].candidates.splice(idx, 1);
                this.setState({
                    socialEvents: socialEvents
                });
                break;
            }
        }
    }

    animateStar(socialEventId) {
        let favorites = this.state.favorites;
        favorites.push({
                key: socialEventId,
                value: true
            }
        );

        this.setState({
            favorites: favorites
        });
    }

    getStarActiveClass() {
        return "star-poly-active"
    }

    renderSubscriptionButton(candidate, socialEventId) {
        const register = (
            <Button className="events-card-button-register" onClick={() => this.handleRegisterUser(candidate, socialEventId)}><span>Register</span></Button>
        );
        const unregister = (
            <Button className="events-card-button-unregister" onClick={() => this.handleUnregisterUser(candidate, socialEventId)}><span>Going</span></Button>
        );

        if(!candidate) {
            return register;
        }
        return unregister;
    }

    renderDetails(socialEventId) {
        return (
            <div className="events-card-details-button">
                <Button onClick={() => this.navigateToEvent(socialEventId)}>Find out more</Button>
            </div>
        );
    }

    renderHashTags(hashTags) {
        let elements = [];
        for (let i = 0; i < hashTags.length; i++) {
            elements.push(<Tag key={i}>{hashTags[i]}</Tag>);
        }
        return elements;
    }

    renderEventCard(socialEvent) {
        let candidate = socialEvent.candidates ?
            socialEvent.candidates.find((user) => user.user._id === this.state.user_id) : null;
        let hashTags = ["#4ever", "#elastos"];
        let image = socialEvent.attachment ? socialEvent.attachment :
            "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg";
        let date = socialEvent.startTime ? moment(socialEvent.startTime).format("MMMM Do YYYY. h:mm a") : "To Be Determined";
        let community = socialEvent.community ? socialEvent.community.name : "-";
        let svgStarClass = this.state.favorites.find((item) => item.key === socialEvent._id && item.value) ? this.getStarActiveClass() : "star-poly";

        return (
            <Card
                key={socialEvent._id}
                cover={<img className="event-card-image" src={image} />}>
                <div className="card-icon" onClick={() => this.animateStar(socialEvent._id)}>
                    <svg width="50%" height="50%" viewBox="0 0 40 37" className="star">
                        <polygon className={svgStarClass} points="272 30 260.244 36.18 262.489 23.09 252.979 13.82 266.122 11.91 272 0 277.878 11.91 291.021 13.82 281.511 23.09 283.756 36.18" transform="translate(-252)"/>
                    </svg>
                </div>
                <div className="events-card-detail">
                    <div className="events-card-time">{date}</div>
                    <div className="events-card-title"
                         onClick={(e) => this.navigateToEvent(socialEvent._id)}>{socialEvent.name}</div>
                    <div className="events-card-location">{community}</div>
                    <div className="events-card-button-container">
                        {this.renderSubscriptionButton(candidate, socialEvent._id)}
                    </div>
                    <div className="events-card-details">
                        {this.renderDetails(socialEvent._id)}
                    </div>
                </div>
                <div className="events-card-hashtags">
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
                        <Row type="flex" justify="center">
                            {this.renderMonthsElements()}
                        </Row>
                    </div>
                    <div className="ebp-events-location">
                        {this.renderCommunityDropDown()}
                    </div>
                    <div className="ebp-events-favorites">
                        {this.renderFavoritesFilter()}
                    </div>
                    <Row className="d_row" type="flex" justify="space-between">
                        {this.renderEventCards(this.state.socialEvents)}
                    </Row>
                </div>
            </div>
        )
    }
}
