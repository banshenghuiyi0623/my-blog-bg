const { query } = require('../util/db');
async function selectAllData() {
    let sql = 'SELECT name, sex FROM users where uid = "00001"';
    let dataList = await query(sql);
    return dataList;
}
async function getData() {
    let dataList = await selectAllData();
    const name = dataList[0].name;
    return name;
}
async function userInfo(ctx) {
    const name = await getData();
    const data = {
        name: `${name}`,
        age: `3年4个月`,
        fans: '50',
        stars: '30'
    };
    ctx.body = data;
}
module.exports = userInfo;
//# sourceMappingURL=userInfo.js.map