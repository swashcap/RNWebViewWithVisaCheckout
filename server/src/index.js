// @flow
require('dotenv').config()

const Koa = require('koa')
const logger = require('koa-logger')
const render = require('koa-ejs')
const path = require('path')

const app = new Koa();
const port = process.env.PORT || 4000
const VISA_CHECKOUT_API_KEY = process.env.VISA_CHECKOUT_API_KEY;

app.use(logger())
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  cache: process.env.NODE_ENV !== 'development'
})

app.use(async (ctx) => {
  await ctx.render('index', { VISA_CHECKOUT_API_KEY });
})

if (require.main === module) {
  app.listen(port) 
  console.log(`Listening on port ${port}`)
}

module.exports = app;

