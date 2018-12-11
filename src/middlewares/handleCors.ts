/*
* author: @gaofeng
* */
import * as Koa from 'koa'
function setCorsHeader(ctx: Koa.Context) {
  ctx.set('Access-Control-Allow-Origin', '*')
}

export function handleCors() {
  return async function (ctx: Koa.Context, next: Function) {
    await next()
    setCorsHeader(ctx)
  }
}
