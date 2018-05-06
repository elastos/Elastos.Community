import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as timeout from 'connect-timeout';
import * as session from 'express-session';
import db from './db';

import router, {middleware} from './router';

import './config';


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

app.use(session({
    name: 'ebp_token',
    secret: 'elastos', // 用来对session id相关的cookie进行签名
    // store: new FileStore(),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*60*24*30 // 30 days
    }
}));

// init router
app.use(middleware);
app.use(router);

(async ()=>{
    await db.create();
    const port = process.env.SERVER_PORT;
    app.listen(port, () => {
        console.log(`start server at port ${port}`);
    });
})();

