const path = require('path')
const fs = require('fs')
import { file } from './file'
import * as Koa from 'koa'

/**
 * @description 获取文件内容
 * @param {object} ctx koa上下文
 * @param {string} filePath 请求资源绝对路径
 * @param {string} 请求获取到的内容
 */

async function getContent ( ctx: Koa.Context, filePath: string ) {
  // 绝对路径
  let reqPath = path.join(filePath, ctx.url)
  console.log('reqPath:', reqPath)
  const isExist = fs.existsSync(filePath)

  let content = ''
  content = isExist
    ? await file( reqPath )
    : '404 Not Found! o(╯□╰)o！'
  return content
}

export { getContent }