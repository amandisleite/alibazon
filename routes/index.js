var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/AuthController');
const CategoryController = require('../controllers/CategoryController');


router.get('/signup', (req, res, next) => { res.render('signup') });
router.post('/signup', AuthController.signUpUser);

router.get('/signin', (req, res, next) => { res.render('signin') });
router.post('/signin', AuthController.signInUser);

router.get('/', (req, res, next) => {
  res.render('index', { name: req.cookies.username });
});

router.get('/:category', CategoryController.getAllSubCategories);
router.get('/:category/:idSubCategory', CategoryController.getAllProducts);
router.get('/:category/:idSubCategory/:idProduct', CategoryController.getOneProduct);


module.exports = router;
