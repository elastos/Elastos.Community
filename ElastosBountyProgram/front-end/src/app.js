import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store from '@/store';
import config from '@/config';
import {USER_ROLE} from '@/constant'
import {api_request} from './util';

import './boot';
import './style/index.scss';

const middleware = (render, props) => {
    return render;
};

const App = () => {
    return (
        <Switch id="ebp-main">
            {
                _.map(config.router, (item, i) => {
                    const props = _.omit(item, ['page', 'path', 'type']);
                    const R = item.type || Route;
                    return (
                        <R path={item.path} key={i} exact component={item.page} {...props} />
                    );
                })
            }
        </Switch>
    );
};

const render = () => {
    ReactDOM.render(
        (
            <Provider store={store}>
                <ConnectedRouter middleware={middleware} history={store.history}>
                    <App/>
                </ConnectedRouter>
            </Provider>
        ),
        document.getElementById('ebp-root')
    );
};

if (sessionStorage.getItem('api-token')) {
    const userRedux = store.getRedux('user');
    api_request({
        path: '/api/user/current_user',
        success: (data) => {
            store.dispatch(userRedux.actions.is_login_update(true));
            if ([USER_ROLE.LEADER].includes(data.role)) {
                store.dispatch(userRedux.actions.is_leader_update(true))
            }
            if ([USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(data.role)) {
                store.dispatch(userRedux.actions.is_admin_update(true))
            }
            store.dispatch(userRedux.actions.email_update(data.email))
            store.dispatch(userRedux.actions.username_update(data.username))
            store.dispatch(userRedux.actions.profile_update(data.profile))
            store.dispatch(userRedux.actions.role_update(data.role))
            store.dispatch(userRedux.actions.current_user_id_update(data._id))
            store.dispatch(userRedux.actions.loading_update(false))
            render()
        },
        error: () => {
            sessionStorage.clear()
            render()
        }
    });
}
else {
    render();
}
