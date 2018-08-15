import React from 'react'
import EmptyPage from '../../EmptyPage'
import './style.scss'
import { Col, Row, Icon, Button, Divider, Avatar, Card } from 'antd'
import {
    FacebookShareCount,
    LinkedinShareCount,
    TwitterShareCount,
    TelegramShareCount,
    RedditShareCount,
    EmailShareCount,

    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    RedditShareButton,
    EmailShareButton,

    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    TelegramIcon,
    RedditIcon,
    EmailIcon
} from 'react-share';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';

const { Meta } = Card;

export default class extends EmptyPage {

    async componentDidMount() {
        const taskId = this.props.match.params.eventId;
        this.props.getTaskDetail(taskId);
    }

    navigateToEvents() {
        this.props.history.push('/events/');
    }

    navigateToUserProfile(userId) {
        this.props.history.push(`/member/${userId}`);
    }

    renderMapComponent() {

        const CustomMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 18.7, lng: 98.98 }} >
                {<Marker position={{ lat: 18.7, lng: 98.98 }} />}
            </GoogleMap>
        ));

        // TODO: Add API key for google maps
        let apiKey = '';
        let url = 'https://maps.googleapis.com/maps/api/js?' + apiKey + 'v=3.exp&libraries=geometry,drawing,places';
        const mapElement = (<CustomMapComponent
            isMarkerShown
            googleMapURL={url}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />);

        return mapElement;
    }

    renderEventDetails() {
        let eventName = this.props.task.name || '-';
        let hostedBy = this.props.task.createdBy ? this.props.task.createdBy.profile.firstName + ' ' +
            this.props.task.createdBy.profile.lastName : '-';
        let hostedByID = this.props.task.createdBy ? this.props.task.createdBy._id : 'not-found';
        let hostedByAvatar = this.props.task.createdBy ? this.props.task.createdBy.profile.avatar : null;
        let eventLocation = (this.props.task.community && this.props.task.community.name) || '';
        let eventDate = this.props.task.startTime || 'To Be Determined';
        let eventType = this.props.task.type || '-';
        let eventInfo = this.props.task.info || '-';
        // descriptionTitle disabled until implemented backend
        let descriptionTitle = '';
        let description = this.props.task.description || '';

        console.log(this.props.task);

        return (
            <Col sm={{span: 24}} md={{span: 12}} className="d_col_left">
                <Row type="flex">
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 16}}>
                        <span className="event-name">{eventName}</span>
                        <span className="event-hosted-by">Hosted by <a onClick={() => this.navigateToUserProfile(hostedByID)}>{hostedBy}</a></span>
                        <div className="event-detail-container">
                            <Row>
                                <Icon type="environment" className="icon-location" />
                                <span className="event-location">{eventLocation}</span>
                            </Row>
                            <Row>
                                <Icon type="clock-circle" className="icon-time"/>
                                <span className="event-time">{eventDate}</span>
                            </Row>
                            <Row>
                                <Icon type="question-circle" className="icon-type"/>
                                <span className="event-type">{eventType}</span>
                            </Row>
                            <Row>
                                <Icon type="info-circle" className="icon-info"/>
                                <span className="event-info">{eventInfo}</span>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 8}} className="hosted-by-avatar-container">
                        {hostedByAvatar &&
                            <Avatar className="hosted-by-avatar" src={hostedByAvatar}/>
                        }
                    </Col>
                </Row>
                <Divider className="event-details-divider"/>
                <div className="event-detail-description">
                    <div className="event-detail-description-title">
                        {descriptionTitle}
                    </div>
                    <div className="event-detail-description-content">
                        {description}
                    </div>
                </div>
            </Col>);
    }

    renderEventActions() {
        let attendance = true;
        let eventImage = this.props.task.attachment || '/assets/images/Elastos_Logo_Temp.png';
        let shareQuote = this.props.task.name || 'Visit us at elastos.org!';

        const buttonActionLabel = attendance ? 'DEREGISTER' : 'REGISTER';
        const buttonActionClass = 'actionButton ' + (attendance ? 'actionDeregister' : 'actionRegister');
        return (
            <Col sm={{span: 24}} md={{span: 12}} className="d_col_right">
                <img src={eventImage}/>
                <Button className={buttonActionClass}>{buttonActionLabel}</Button>
                <span className="share-with-friends">SHARE WITH FRIENDS</span>
                <Row className="social-share-actions">
                    <FacebookShareButton
                        url={window.location.href}
                        quote={shareQuote}
                        className="share-button">
                        <FacebookIcon
                            size={32}
                            round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={window.location.href}
                        title={shareQuote}
                        className="share-button">
                        <TwitterIcon
                            size={32}
                            round />
                    </TwitterShareButton>
                    <TelegramShareButton
                        url={window.location.href}
                        title={shareQuote}
                        className="share-button">
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <LinkedinShareButton
                        url={window.location.href}
                        title={shareQuote}
                        windowWidth={750}
                        windowHeight={600}
                        className="share-button">
                        <LinkedinIcon
                            size={32}
                            round />
                    </LinkedinShareButton>
                    <RedditShareButton
                        url={window.location.href}
                        title={shareQuote}
                        windowWidth={660}
                        windowHeight={460}
                        className="share-button">
                        <RedditIcon
                            size={32}
                            round />
                    </RedditShareButton>
                    <EmailShareButton
                        url={window.location.href}
                        subject={shareQuote}
                        body="body"
                        className="share-button">
                        <EmailIcon
                            size={32}
                            round />
                    </EmailShareButton>
                </Row>
            </Col>
        );
    }

    ord_renderContent () {
        if (this.props.isTaskLoading()) {
            return false;
        }
        console.log(this.props.task);
        let communityName = (this.props.task.community && this.props.task.community.name) || 'Elastos Event';
        let backButton = '< Back';
        return (
            <div className="p_EVENT_DETAILS">
                <div className="ebp-page">
                    <div className="ebp-events-location">
                        {communityName}
                    </div>
                    <a onClick={() => this.navigateToEvents()}>{backButton}</a>
                    <Row className="d_row_upper">
                        {this.renderEventDetails()}
                        {this.renderEventActions()}
                    </Row>
                    <Row className="d_row_mid">
                        <div className="map">
                            {this.renderMapComponent()}
                        </div>
                    </Row>
                    <Row className="d_row_lower">
                        <span className="title">
                            BALAYAGE w/ KITTY COLOURIST - VIC
                        </span>
                        <span>at</span>
                        <span className="title-2">
                            La Biosthetique Academie
                        </span>
                        <span className="address">
                            1209 High Street Armadale, Melbourne, Victoria 3143
                        </span>
                        <Row>
                            <Icon type="link" />
                            <Icon type="link" />
                            <Icon type="link" />
                            <Icon type="link" />
                        </Row>
                    </Row>
                </div>
            </div>
        )
    }
}
