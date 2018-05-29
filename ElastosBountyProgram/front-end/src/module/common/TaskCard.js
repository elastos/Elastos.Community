import React from 'react';
import BaseComponent from '@/model/BaseComponent';

import { Card, Icon, Avatar } from 'antd';
import {DEFAULT_IMAGE} from "../../constant";

const { Meta } = Card;

export default class extends BaseComponent {

    ord_render(){
        const {thumbnail, name, reward} = this.props;
        console.log(this.props);
        const desc = reward ? `Ela : ${reward.ela.amount} | VotePower : ${reward.votePower.amount}` : 'no reward';
        return (
            <Card onClick={this.click.bind(this)}
                style={{cursor:'pointer'}}
                cover={<img style={{height:200}} src={thumbnail || DEFAULT_IMAGE.TASK} />}
            >
                <Meta
                    title={name}
                    description={desc}
                />
            </Card>
        );
    }
    click(){
        const {_id} = this.props;
        alert(_id);
    }
}
