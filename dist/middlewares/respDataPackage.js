"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function respDataPackage(ctx) {
    const data = ctx.body;
    let resp = Object.assign({}, { respData: data }, { respCode: '0' });
    ctx.body = resp;
}
module.exports = function () {
    return async function (ctx, next) {
        await next();
        respDataPackage(ctx);
    };
};
//# sourceMappingURL=respDataPackage.js.map