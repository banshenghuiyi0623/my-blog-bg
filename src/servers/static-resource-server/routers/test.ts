
import * as Koa from 'koa'

async function test(ctx: Koa.Context) {
  const data = {
    name: `wind`,
    age: `3年4个月`,
    fans: '50',
    stars: '30'
  }
  console.log('request -- test', data)
  let url = ctx.request.url
  ctx.res.writeHead(200)
  ctx.res.write(url)
  ctx.res.end()
}

module.exports = test