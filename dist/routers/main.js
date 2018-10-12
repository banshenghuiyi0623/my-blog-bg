"use strict";
/*
 * ahthor @gf
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
const userInfoController = require('../controllers/userInfo');
const routers = router
    .get('/main/nav', userInfoController);
module.exports = routers;
//# sourceMappingURL=main.js.map