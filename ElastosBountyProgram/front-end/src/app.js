import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store from '@/store';
import config from '@/config';
import {USER_ROLE} from '@/constant'

import './boot';
import './style/index.scss';

const middleware = (render, props)=>{
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

const apiToken = sessionStorage.getItem('api-token')

if (apiToken) {

    const userRedux = store.getRedux('user');

    let request = new Request(process.env.SERVER_URL + '/user/current_user', {
        method: 'GET',
        headers: new Headers({
            'api-token': apiToken
        })
    })

    fetch(request).then((res) => res.json()).then(async (result) => {

        if (result.code !== 1) {
            return
        }

        await store.dispatch(userRedux.actions.is_login_update(true))
        if ([USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(result.data.role)) {
            await store.dispatch(userRedux.actions.is_admin_update(true))
        }

        await store.dispatch(userRedux.actions.profile_update(result.data.profile))
        await store.dispatch(userRedux.actions.role_update(result.data.role))

    }).then(() => {
        render()
    })

} else {
    render()
}

