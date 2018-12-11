import * as Koa from 'koa'
import * as path from 'path'
import * as fs from 'fs'
const zlib = require('zlib')

const config = require('../config')
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

// 获取文件内容
function getFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      err && reject(false)
      resolve(data)
    })
  })
}

// 检查文件是否存在
function checkFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.exists(path, exists => {
      resolve(exists)
    })
  })
}

// 获取文件最后修改时间
function getFileModifiedTime( realPath: string ) {
  return new Promise((resolve, reject) => {
    fs.stat(realPath, (err, stat) => {
      err && reject(err)
      resolve(stat.mtime.toUTCString())
    })
  })
}

//  设置缓存响应头
async function setCacheHeader( ctx: Koa.Context, fullStaticPath: string ) {
  let ext = path.extname( ctx.url )
  ext = ext ? ext.slice(1) : 'unknown'
  if (ext.match(config.Expires.fileMatch)) {
    let expires = new Date()
    expires.setTime(expires.getTime() + config.Expires.maxAge * 1000)
    ctx.set("Expires", expires.toUTCString())
    ctx.set("Cache-Control", `max-age=${config.Expires.maxAge}`)
    ctx.set('ETag', '00003')
  }
  const lastModified = await getFileModifiedTime(fullStaticPath).catch(err => undefined)
  lastModified && ctx.set('Last-Modified', lastModified)
}

// 开启Gzip压缩
function setGzip( ctx: Koa.Context, realPath: string, ext: string ) {
  const acceptEncoding = ctx.req.headers['accept-encoding'] || ''
  const matched = ext.match(config.Compress.match)
  // acceptEncoding: string[], when did that happen, I wonder how, I wonder why
  let raw = fs.createReadStream(realPath)

  if (matched && (acceptEncoding as string).match(/\bgzip\b/)) {
    console.log('setGzip-zip-start')
    ctx.status = 200
    ctx.set('Content-Encoding', 'gzip')
    ctx.body = raw.pipe(zlib.createGzip())
    console.log('setGzip-zip-end')
  } else if (matched && (acceptEncoding as string).match(/\bdeflate\b/)) {
    let raw = fs.createReadStream(realPath)
    ctx.status = 200
    ctx.set('Content-Encoding', 'deflate')
    raw.pipe(zlib.createDeflate()).pipe(ctx.res)
  } else {
    let raw = fs.createReadStream(realPath)
    ctx.status = 200
    raw.pipe(ctx.res)
  }
}

// 处理响应
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

    // setGzip(ctx, reqPath, path.extname(ctx.url))

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