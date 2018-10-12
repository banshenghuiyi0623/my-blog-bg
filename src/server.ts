// import * as Koa from 'koa';
// import * as Router from 'koa-router';
//
// const app = new Koa();
// const router = new Router();
//
// router.get('/*', async (ctx) => {
//     ctx.body = 'Hello World!';
// });
//
// app.use(router.routes());
//
// app.listen(3000);
//
// console.log('Server running on port 3002');

const Koa = require('koa')
const app = new Koa()

const handleCors = require('./middlewares/handleCors')
const respDataPackage = require('./middlewares/respDataPackage')
const routers = require('./routers/index')

// 初始化路由中间件
app.use(handleCors())
  .use(respDataPackage())
  .use(routers.routes())
  .use(routers.allowedMethods())


app.listen(3009, () => {
  console.log('server run as 3009')
})
