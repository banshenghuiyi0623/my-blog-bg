
import * as Koa from 'koa'

async function test(ctx: Koa.Context) {
  const data = {
    name: `wind`,
    age: `3年4个月`,
    fans: '50',
    stars: '30'
  }
  console.log('request -- test', data)
}

export default test