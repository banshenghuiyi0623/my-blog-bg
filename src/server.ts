import * as Koa from 'koa'
const routers = require('./routers/index')

const app = new Koa()

// 初始化路由中间件
app
  .use(routers.routes())
  .use(routers.allowedMethods())

app.listen(3008, () => {
  console.log('server run as 3008')
})
