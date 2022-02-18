const { Router } = require('express');
const UserController = require('../controllers/UserController');
const { validateUser } = require('../middlewares/userValidation');

const router = Router();

router.use(function (req, res, next) {
    res.locals.token = req.cookies.token;
    next();
});

router.get('/signin', (req, res, next) => { res.render('signin') });
router.post('/signin', UserController.signInUser);
router.use(validateUser)
router.get('/signup', (req, res, next) => { res.render('signup') });
router.post('/signup', UserController.signUpUser);
router.get('/logout', UserController.logoutUser);


module.exports = router;