import * as Koa from 'koa'
import * as path from 'path'
import * as fs from 'fs'

const cacheConfig = require('../config/cache')
//资源类型
const mimes = require('../util/mimes')

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
      err && reject(false)
      resolve(data)
    })
  })
}

function checkFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.exists(path, exists => {
      resolve(exists)
    })
  })
}

function getFileModifiedTime( realPath: string ) {
  return new Promise((resolve, reject) => {
    fs.stat(realPath, (err, stat) => {
      err && reject(err)
      resolve(stat.mtime.toUTCString())
    })
  })
}

async function setCacheHeader( ctx: Koa.Context, fullStaticPath: string ) {
  let ext = path.extname( ctx.url )
  ext = ext ? ext.slice(1) : 'unknown'
  if (ext.match(cacheConfig.Expires.fileMatch)) {
    let expires = new Date()
    expires.setTime(expires.getTime() + cacheConfig.Expires.maxAge * 1000)
    ctx.set("Expires", expires.toUTCString())
    ctx.set("Cache-Control", `max-age=${cacheConfig.Expires.maxAge}`)
    ctx.set('ETag', '00002')
  }
  const lastModified = await getFileModifiedTime(fullStaticPath).catch(err => undefined)
  lastModified && ctx.set('Last-Modified', lastModified)
}

async function getStatic(ctx: Koa.Context) {
  const fullStaticPath = path.join(__dirname, staticPath)
  const reqPath = path.join(fullStaticPath, ctx.url)
  const exists = await checkFile(reqPath)

  if (!exists) {
    ctx.res.writeHead(404)
    ctx.res.write('sorry can`t find the file.')
    ctx.res.end()
  } else {
    const content = await getFile(reqPath).catch(err => err)
    const _mime = parseMime( ctx.url )

    ctx.type = _mime || "text/plain"

    if (content) {
      await setCacheHeader(ctx, fullStaticPath)
      ctx.status = 200

      if (ctx.fresh) {
        ctx.status = 304
        return
      }

      ctx.res.write(content, 'binary')
      ctx.res.end()
    } else {
      ctx.status = 500
      ctx.res.end()
    } 
  }
}

module.exports = getStatic