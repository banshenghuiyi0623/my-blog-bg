"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const routers = require('./routers/index');
const app = new Koa();
// 初始化路由中间件
app
    .use(routers.routes())
    .use(routers.allowedMethods());
// .use(async ctx => {
//   ctx.body = 'Hello World'
// })
// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })
app.listen(3008, () => {
    console.log('server run as 3008');
});
//# sourceMappingURL=server.js.map