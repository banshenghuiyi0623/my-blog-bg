/**
 * @author gf
 * 
 */
import * as Router from 'koa-router'
const getStaticController = require('../controllers/getStatic')

const router = new Router();

const routers = router
  .get('*', getStaticController)

module.exports = routers
