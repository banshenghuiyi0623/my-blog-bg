import * as Koa from 'koa'
import * as path from 'path'
import mimes from '../util/mimes'
import { getContent } from '../util/content'

// 静态资源目录对于相对路径
const staticPath = '../../../static'

// 解析资源类型
function parseMime (url: string) {
  let extName = path.extname( url )
  extName = extName ? extName.slice(1) : 'undefined'
  return  mimes[ extName ]
}

async function getStatic(ctx: Koa.Context) {
  console.log('getstatic-start')
  let fullStaticPath = path.join(__dirname, staticPath)
  console.log('fullStaticPath', fullStaticPath)
  let _content = getContent ( ctx, fullStaticPath )

  let _mime = parseMime( fullStaticPath )

  // 如果有对应的文件类型，就配置上下文的类型
  if ( _mime ) {
    ctx.type = _mime
  }

  // 
  if ( _mime && _mime.indexOf('image/') >= 0) {
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    ctx.body = _content
  }
}
  
export default getStatic 