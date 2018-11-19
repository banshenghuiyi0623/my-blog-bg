const router  = require('koa-router')()

const main = require('./main')

router.use('/page', main.routes(), main.allowedMethods())

module.exports = router
