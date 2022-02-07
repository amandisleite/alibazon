var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/:category', CategoryController.getAllSubCategories);
router.get('/:id', CategoryController.getAllSubCategories);

module.exports = router;
