const Router = require('express')

const router = new Router()
const { validation, controllerWrapper } = require('../middlewares')
const { joiSchema } = require('../models/Hero')
const heroController = require('../controllers/heroController')

router.post('/', validation(joiSchema), controllerWrapper(heroController.create))
router.get('/', controllerWrapper(heroController.getAll))
router.get('/:id', controllerWrapper(heroController.getById))
router.patch('/:id', controllerWrapper(heroController.updateById))
router.delete('/:id', controllerWrapper(heroController.deleteById))


module.exports = router