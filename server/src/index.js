// @flow
require('dotenv').config();

const Koa = require('koa');
const logger = require('koa-logger');
const render = require('koa-ejs');
const koaStatic = require('koa-static');
const {get} = require('koa-route');
const path = require('path');

const checkout = require('./routes/checkout.js');

const app = new Koa();
const port = process.env.PORT || 4000;

app.use(logger());
app.use(koaStatic(path.resolve(__dirname, '../public')));
render(app, {
  root: path.join(__dirname, 'view'),
  cache: process.env.NODE_ENV !== 'development',
});

app.use(get('/checkout', checkout));

if (require.main === module) {
  app.listen(port);
  console.log(`Listening on port ${port}`);
}

module.exports = app;
