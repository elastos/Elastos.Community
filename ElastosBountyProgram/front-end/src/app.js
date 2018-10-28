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
                {process.env.NODE_ENV === 'production' && <script defer src="/assets/js/rollbar_prod.js"></script>}
                {process.env.NODE_ENV === 'staging' && <script defer src="/assets/js/rollbar_staging.js"></script>}
                {process.env.NODE_ENV === 'production' && <script async src={'https://www.googletagmanager.com/gtag/js?id=' + process.env.GA_ID}></script>}
                {process.env.NODE_ENV === 'production' && <script>{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '` + process.env.GA_ID + `');`}</script>}
                {window.location.pathname === '/' && <script defer src="/assets/js/elastos.js"></script>}

                <script>{(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments, 0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn4.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[])}</script>
                <script type="text/javascript">mixpanel.init("5e85a4692cc5eda62cb0b734f3ea661d");</script>

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
            </Switch>å
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
            store.dispatch(userRedux.actions.circles_update(_.values(data.circles)))
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

