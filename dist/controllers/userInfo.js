"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function userInfo(ctx) {
    const data = {
        name: `wind`,
        age: `3年4个月`,
        fans: '50',
        stars: '30'
    };
    ctx.body = data;
    console.log('request --');
}
module.exports = userInfo;
//# sourceMappingURL=userInfo.js.map