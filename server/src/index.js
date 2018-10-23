// @flow
require('dotenv').config();

const Koa = require('koa');
const logger = require('koa-logger');
const render = require('koa-ejs');
const koaStatic = require('koa-static');
const {get} = require('koa-route');
const path = require('path');

const app = new Koa();
const port = process.env.PORT || 4000;
const VISA_CHECKOUT_API_KEY = process.env.VISA_CHECKOUT_API_KEY;

app.use(logger());
app.use(koaStatic(path.resolve(__dirname, '../public')));
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  cache: process.env.NODE_ENV !== 'development',
});

app.use(
  get('/', async ctx => {
    let subtotal = 0;

    if (ctx.query.total) {
      const parsed = parseFloat(ctx.query.total);

      if (!Number.isNaN(parsed)) {
        subtotal = parsed;
      }
    }

    await ctx.render('index', {
      CHECKOUT_SUBTOTAL: subtotal,
      VISA_CHECKOUT_API_KEY,
    });
  })
);

if (require.main === module) {
  app.listen(port);
  console.log(`Listening on port ${port}`);
}

module.exports = app;
