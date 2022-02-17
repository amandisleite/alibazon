require('dotenv').config();
// const Sentry = require('@sentry/browser');
// const createError = require('http-errors');
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

// app.use(function onError(err, req, res, next) {
//   // res.statusCode = 500;
//   res.end(res.sentry + "erro")
// })


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
