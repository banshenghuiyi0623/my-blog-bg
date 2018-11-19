import * as Router from 'koa-router'
import staticServer from '../servers/static-resource-server/routers'
import test from './testrouter'

const router = new Router()

router.use('/static', staticServer.routes(), staticServer.allowedMethods())
  .use('/test', test.routes(), test.allowedMethods())
// const router  = require('koa-router')()

// const main = require('./main')

// router.use('/page', main.routes(), main.allowedMethods())

// module.exports = router

export default router