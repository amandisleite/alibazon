const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = Router();

router.get('/:category', CategoryController.getParentCategories);
router.get('/:category/:mainCategory', CategoryController.getAllSubCategories);
router.get('/:category/:mainCategory/:subcategory', CategoryController.getAllProducts);
router.get('/:category/:mainCategory/:subcategory/:idProduct', CategoryController.getOneProduct);

module.exports = router;