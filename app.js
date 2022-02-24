require('dotenv').config();
const express = require('express');
const Sentry = require('@sentry/node');
const { BrowserTracing } = require('@sentry/tracing');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes');

const app = express();

Sentry.init({
    dsn: "https://229a139552de40f39974dd0a9b22d948@o1143057.ingest.sentry.io/6202071",
    integrations: [
        new BrowserTracing(),
        new Sentry.Integrations.Http({ tracing: true })
    ],
    debug: true,
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});
Sentry.configureScope(scope => {
    scope.setSpan(transaction);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( function(req, res, next) {

    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
  
    return next();
  
});

routes(app);

module.exports = app;
