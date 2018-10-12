/*
* author: @gaofeng
* */
import * as Koa from 'koa'
function setCorsHeader(ctx: Koa.Context) {
  ctx.set('Access-Control-Allow-Origin', '*')
}

module.exports = function () {
  return async function (ctx: Koa.Context, next: Function) {
    await next()
    setCorsHeader(ctx)
  }
}
