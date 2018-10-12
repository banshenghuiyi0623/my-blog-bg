"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setCorsHeader(ctx) {
    ctx.set('Access-Control-Allow-Origin', '*');
}
module.exports = function () {
    return async function (ctx, next) {
        await next();
        setCorsHeader(ctx);
    };
};
//# sourceMappingURL=handleCors.js.map