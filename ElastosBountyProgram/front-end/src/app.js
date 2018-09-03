import React from 'react';
import ReactDOM from 'react-dom'
import {Helmet} from "react-helmet"
import _ from 'lodash';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store from '@/store';
import config from '@/config';
import {USER_ROLE} from '@/constant'
import {api_request} from "./util";

import './boot';
import './style/index.scss';
import './style/mobile.scss';

const middleware = (render, props)=>{
	return render;
};

const App = () => {
    return (
        <div>
            <Helmet>
                <meta name="cr-env" content={process.env.NODE_ENV} />
                <meta name="cr-version-number" content={process.env.CR_VERSION ? '' + process.env.CR_VERSION : 'unknown'} />
                {process.env.NODE_ENV === 'production' && <script async src={'https://www.googletagmanager.com/gtag/js?id=' + process.env.GA_ID}></script>}
                {process.env.NODE_ENV === 'production' && <script>{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '` + process.env.GA_ID + `');`}</script>}
                <script defer src="/assets/js/elastos.js"></script>
                <script>{
                    (function() {
                        window.Intercom("update");
                    })()
                }</script>
            </Helmet>
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
        </div>
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

if (!sessionStorage.getItem('api-token') && localStorage.getItem('api-token')) {
    sessionStorage.setItem('api-token', localStorage.getItem('api-token'))
}

if (sessionStorage.getItem('api-token')) {
    const userRedux = store.getRedux('user');
    api_request({
        path : '/api/user/current_user',
        success : (data)=>{
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
            localStorage.removeItem('api-token')
            render()
        }
    });
}
else{
    render();
}

