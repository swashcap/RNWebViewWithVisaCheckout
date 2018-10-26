// @flow
require('dotenv').config();

const Koa = require('koa');
const logger = require('koa-logger');
const render = require('koa-ejs');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const {get, post} = require('koa-route');
const fs = require('fs');
const http = require('http');
const path = require('path');

const checkout = require('./routes/checkout.js');
const payment = require('./routes/payment.js');

const app = new Koa();
const port = process.env.PORT || 4000;

/**
 * Visa `callid` map for storing and retrieving payment data. In the real world
 * this should be a database with queued reads/writes.
 */
app.context.visaCallIds = {};

app.use(logger());
app.use(koaStatic(path.resolve(__dirname, '../public')));
render(app, {
  root: path.join(__dirname, 'view'),
  cache: process.env.NODE_ENV !== 'development',
});

app.use(get('/checkout', checkout));
app.use(get('/payment/:callId', payment.get));
app.use(post('/payment', payment.post));

if (require.main === module) {
  http
    .createServer(
      // {
      //   cert: fs.readFileSync(
      //     path.resolve(__dirname, '../certs/localhost.crt'),
      //     'utf8'
      //   ),
      //   key: fs.readFileSync(
      //     path.resolve(__dirname, '../certs/localhost.key'),
      //     'utf8'
      //   ),
      // },
      app.callback()
    )
    .listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
}

module.exports = app;
