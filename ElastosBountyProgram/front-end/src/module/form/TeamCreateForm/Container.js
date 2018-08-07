import {createContainer, goPath} from "@/util";
import Component from './Component';
import TeamService from '@/service/TeamService';
import {message} from 'antd'
import _ from 'lodash'

export default createContainer(Component, (state) => {
    return {

    };
}, () => {
    const ts = new TeamService();
    return {
        async create(param) {
            param.pictures = [
                {
                    thumbUrl: '',//param.pictures[0].thumbUrl,
                    name: param.pictures[0].name
                }
            ]
            return ts.create(param);
        }
    };
});
