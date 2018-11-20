import * as Router from 'koa-router'
const staticServer = require('../servers/static-resource-server/routers')
const test = require('./testrouter')

const router = new Router()

router
  .use('/test', test.routes(), test.allowedMethods())
  .use('/img', staticServer.routes(), staticServer.allowedMethods())

module.exports = router