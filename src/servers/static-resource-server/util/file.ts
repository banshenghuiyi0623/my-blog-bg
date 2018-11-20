const fs = require('fs')

/**
 * @description 读取文件方法
 * @param {string} filePath 文件本地绝对路径
 * @return {string|binary} 返回文件内容
 */

function file( filePath: string ) {
  return fs.readFileSync(filePath, 'binary')
}

module.exports = file