import * as Koa from 'koa'
import { handleCors } from './middlewares/handleCors'
import routers from './routers/index'

const app = new Koa()

// const respDataPackage = require('./middlewares/respDataPackage')

// 初始化路由中间件
app.use(handleCors)
  .use(routers.routes())
  .use(routers.allowedMethods())

app.listen(3009, () => {
  console.log('server run as 3009')
})
