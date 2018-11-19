/**
 * @author gf
 * 
 */
import * as Router from 'koa-router'
import getStaticController  from '../controllers/getStatic'

const router = new Router();

const routers = router
  .get('', getStaticController)

export default routers
