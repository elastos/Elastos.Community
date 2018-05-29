import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Row, Col } from 'antd'

export default class extends BaseComponent {
    ord_render () {
        const events = [
            {
                title: 'Paris Meetup - 18 May 2018',
                description: 'The greatest scientists are artist too',
                image: 'http://18.218.149.20:3001/assets/images/task_thumbs/12.jpg',
                date: '2018.05.18',
                time: '24:00',
                hour: '12 hour',
                url: 'http://example.com'
            },
            {
                title: 'Paris Meetup - 18 May 2018',
                description: 'The greatest scientists are artist too',
                image: 'http://18.218.149.20:3001/assets/images/task_thumbs/12.jpg',
                date: '2018.05.18',
                time: '24:00',
                hour: '12 hour',
                url: 'http://example.com'
            },
            {
                title: 'Paris Meetup - 18 May 2018',
                description: 'The greatest scientists are artist too',
                image: 'http://18.218.149.20:3001/assets/images/task_thumbs/12.jpg',
                date: '2018.05.18',
                time: '24:00',
                hour: '12 hour',
                url: 'http://example.com'
            }
        ]

        return (
            <Row>
                {events.map((event, index) => {
                    return (
                        <Col span={8} key={index}>
                            <div className="wrap-event">
                                <div className="wrap-image">
                                    <img src={event.image}/>
                                </div>
                                <div className="event-title">{event.title}</div>
                                <div className="event-description">{event.description}</div>
                                <div className="event-meta">{event.date} / {event.time} / {event.hour} <a href={event.url}>See Event</a></div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        )
    }
}
