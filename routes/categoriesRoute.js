const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = Router();

router.get('/:category', CategoryController.getParentCategories);
router.get('/:category/:mainCategory', CategoryController.getAllSubCategories);
router.get('/:category/:mainCategory/:idSubcategory', CategoryController.getAllProducts);
router.get('/:category/:mainCategory/:idSubcategory/:idProduct', CategoryController.getOneProduct);

module.exports = router;