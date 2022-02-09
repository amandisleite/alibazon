const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = Router();

router.get('/:category', CategoryController.getAllSubCategories);
router.get('/:category/:idSubcategory', CategoryController.getAllProducts);
router.get('/:category/:idSubcategory/:idProduct', CategoryController.getOneProduct);

module.exports = router;