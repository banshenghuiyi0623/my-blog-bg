/*
 * ahthor @gf
 *
 *
 */

import * as Router from 'koa-router'
const router = new Router()
const userInfoController = require('../controllers/userInfo')

const routers = router
  .get('/main/nav', userInfoController)

module.exports = routers