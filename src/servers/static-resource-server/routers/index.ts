
import * as Router from 'koa-router'
const getStatic = require('./getStatic')
const router = new Router()

router
  // .use('*', test.routes(), test.allowedMethods())
  .use('*', getStatic.routes(), getStatic.allowedMethods)

module.exports = router
