
const Router = require('express')

const router = new Router()

const heroRouter = require('./heroRouter')

router.use('/hero', heroRouter)

module.exports = router