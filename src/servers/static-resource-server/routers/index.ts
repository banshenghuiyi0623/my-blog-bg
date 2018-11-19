
import * as Router from 'koa-router'
import getStatic from './getStatic'
const router = new Router()

router.use('', getStatic.routes(), getStatic.allowedMethods())

export default router
