import * as Koa from 'koa'
function respDataPackage(ctx: Koa.Context) {
  const data = ctx.body
  let resp = Object.assign({},{respData: data},{respCode: '0'})
  ctx.body = resp
}

module.exports = function () {
  return async function (ctx: Koa.Context, next: Function) {
    await next()
    respDataPackage(ctx)
  }
}
