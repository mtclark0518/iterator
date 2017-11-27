const router = require('express').Router();
const controller = require('../controller/controller')

router.post('/api/login', controller.login)

module.exports = router;
