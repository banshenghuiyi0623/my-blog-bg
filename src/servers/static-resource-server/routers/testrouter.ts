/*
 * ahthor @gf
 *
 *
 */

import * as Router from 'koa-router'
const testController = require('./test')
const router = new Router()

const routers = router.get('*', testController)

module.exports = routers