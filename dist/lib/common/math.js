/*
 * author: @gf
 */
/*
* 字符串转换为数字
*
* */
function isNumber(x) {
    return typeof x === 'number';
}
function isString(x) {
    return typeof x === 'string';
}
function strToNum(str, msg) {
    const numReg = /^(0|[1-9]\d*)$/g;
    if (numReg.test(str)) {
        return parseInt(str, 10);
    }
    else {
        return msg;
    }
}
/*
 * 数学处理器 ~~ 哈哈
 */
class MathHandler {
    toNumber(s, errMsg) {
        if (isNumber(s))
            return s;
        if (isString(s)) {
            strToNum(s, errMsg);
        }
    }
}
module.exports = MathHandler;
//# sourceMappingURL=math.js.map