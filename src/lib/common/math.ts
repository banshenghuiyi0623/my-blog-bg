/*
 * author: @gf
 */

/*
* 字符串转换为数字
*
* */
function isNumber(x: any): x is number{
  return typeof x === 'number'
}
function isString(x: any): x is string{
  return typeof x === 'string'
}
function strToNum (str: string, msg?: string) {
  const numReg = /^(0|[1-9]\d*)$/g
  if (numReg.test(str)) {
    return parseInt(str, 10);
  } else {
    return msg
  }
}

/*
 * 数学处理器 ~~ 哈哈
 */
class MathHandler {
  toNumber(s: number | string, errMsg: string): number | string {
    if (isNumber(s)) return s;
    if (isString(s)) {
      strToNum(s, errMsg)
    }
  }

}

module.exports = MathHandler