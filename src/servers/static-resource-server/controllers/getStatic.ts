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
// 文件不存在处理
function noFileHandler (ctx: Koa.Context) {
  ctx.res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  ctx.res.write(`This request URL ${ctx.url} was not found`)
  ctx.res.end()
}
// 文件存在处理
function fileHandler (ctx: Koa.Context, file: any) {
  let _mime = parseMime( ctx.url )

  // 如果有对应的文件类型，就配置上下文的类型
  const contentType = _mime || "text/plain"
  
  ctx.res.writeHead(200, {
    'Content-Type': contentType
  })
  ctx.res.write(file, 'binary')
  ctx.res.end()
}
// 错误处理
function errorHandler (ctx: Koa.Context) {
  ctx.res.writeHead(500, {
    'Content-Type': 'text/plain'
  })
  ctx.res.write('服务器错误')
  ctx.res.end()
}

// async function getStatic(ctx: Koa.Context) {
//   let fullStaticPath = path.join(__dirname, staticPath)
//   let _content = await getContent ( ctx, fullStaticPath )
//   let _mime = parseMime( ctx.url )

//   // 如果有对应的文件类型，就配置上下文的类型
//   ctx.type = _mime || "text/plain"

//   if ( _mime ) {
//     ctx.res.writeHead(200)
//     ctx.res.write(_content, 'binary')
//     ctx.res.end()
//   }
// }
function getStatic(ctx: Koa.Context) {
  let fullStaticPath = path.join(__dirname, staticPath)
  let reqPath = path.join(fullStaticPath, ctx.url)
  fs.exists(reqPath, (isExists: boolean) => {
    if (!isExists) {
      noFileHandler(ctx)
    } else {
      fs.readFile(reqPath, (err: any, file: any) => {
        if (err) {
          errorHandler(ctx)
        } else {
          console.log('文件存在')
          fileHandler(ctx, file)
        }
      })
    }
  })
}
  
module.exports = getStatic 