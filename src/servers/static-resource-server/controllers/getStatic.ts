import * as Koa from 'koa'
import * as path from 'path'
import * as fs from 'fs'
const mimes = require('../util/mimes')
const getContent = require('../util/content')

// 静态资源目录对于相对路径
const staticPath = '../../../static'

// 解析资源类型
function parseMime (url: string) {
  let extName = path.extname( url )

  extName = extName ? extName.slice(1) : 'undefined'

  return  mimes[extName]
}

function getFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

function checkFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.exists(path, exists => {
      exists && resolve(exists)
      reject()
    })
  })
}

async function getStatic(ctx: Koa.Context) {
  console.log('getstatic')
  const fullStaticPath = path.join(__dirname, staticPath)
  const reqPath = path.join(fullStaticPath, ctx.url)
  const exists = await checkFile(reqPath)
  const content = exists ? await getFile(reqPath) : 'sorry can`t find file'
  const _mime = parseMime( ctx.url )
  ctx.type = _mime || "text/plain"
  ctx.res.writeHead(200)
  ctx.res.write(content, 'binary')
  ctx.res.end()
}

module.exports = getStatic