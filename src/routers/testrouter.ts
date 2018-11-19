/*
 * ahthor @gf
 *
 *
 */

import * as Router from 'koa-router'
import testController from './test'
const router = new Router()

const routers = router
  .get('/test', testController)
export default routers