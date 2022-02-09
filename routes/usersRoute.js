const { Router } = require('express');
const UserController = require('../controllers/UserController');
const { validateUser } = require('../middlewares/userValidation');

const router = Router();

router.use(validateUser)
router.get('/signup', (req, res, next) => { res.render('signup') });
router.post('/signup', UserController.signUpUser);

router.get('/signin', (req, res, next) => { res.render('signin') });
router.post('/signin', UserController.signInUser);

module.exports = router;