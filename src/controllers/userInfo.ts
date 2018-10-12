
import * as Koa from 'koa'
async function userInfo(ctx: Koa.Context) {
  const data = {
    name: `wind`,
    age: `3年4个月`,
    fans: '50',
    stars: '30'
  }
  ctx.body = data
  console.log('request --')
}

module.exports = userInfo