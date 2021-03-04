const user = require('../controllers/user.controller')
const router = require('express').Router();
const jwtMiddleware = require('../middlewares/jwtAuth.js')
const joiMiddleware = require('../middlewares/joiValidators')



router.post('/register', joiMiddleware, user.create);


module.exports = router