import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store from '@/store';
import config from '@/config';

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

    fetch(process.env.SERVER_URL + '/user/reauth?apiToken=' + encodeURIComponent(apiToken)).then((res) => res.json()).then(async (result) => {

        if (result.code !== 1) {
            return
        }

        sessionStorage.setItem('api-token', result.data['api-token'])

        await store.dispatch(userRedux.actions.is_login_update(true))
        await store.dispatch(userRedux.actions.profile_update(result.data.user.profile))
        await store.dispatch(userRedux.actions.role_update(result.data.user.role))

    }).then(() => {
        render()
    })

} else {
    render()
}

