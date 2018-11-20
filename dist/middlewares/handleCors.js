"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setCorsHeader(ctx) {
    ctx.set('Access-Control-Allow-Origin', '*');
}
function handleCors() {
    return async function (ctx, next) {
        await next();
        setCorsHeader(ctx);
    };
}
exports.handleCors = handleCors;
//# sourceMappingURL=handleCors.js.map