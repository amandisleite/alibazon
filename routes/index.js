var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/:category', CategoryController.getAllSubCategories);
router.get('/:category/:idSubCategory', CategoryController.getAllProducts);
router.get('/:category/:idSubCategory/:idProduct', CategoryController.getOneProduct);

module.exports = router;
