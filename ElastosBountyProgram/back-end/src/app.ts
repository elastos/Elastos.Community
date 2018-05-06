import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as timeout from 'connect-timeout';
import * as session from 'express-session';
import * as ConnectMongo from 'connect-mongo';
import db from './db';

import router, {middleware} from './router';

import './config';

(async ()=>{
    const DB = await db.create();

    const app = express();

    const TIMEOUT = '120s';
    app.use(timeout(TIMEOUT));

    morgan.format('ebp', '[Backend] :method :url :status :res[content-length] - :response-time ms');
    app.use(morgan('ebp'));


    app.use(helmet());
    const bodyParserOptions = {
        strict: false,
        limit: '2mb'
    };
    app.use(bodyParser.json(bodyParserOptions));
    app.use(bodyParser.urlencoded({extended: false}));

    const SessionStore = ConnectMongo(session);
    app.use(session({
        name: 'ebp_token',
        secret: 'elastos',
        store: new SessionStore({
            mongooseConnection: DB.connection
        }),
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000*60*60*24*30 // 30 days
        }
    }));

// init router
    app.use(middleware);
    app.use(router);

    const port = process.env.SERVER_PORT;
    app.listen(port, () => {
        console.log(`start server at port ${port}`);
    });
})();

