var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/:category', CategoryController.getAllSubCategories);

// router.get('/womens', async (req, res, next) => {
//   try {
//     const main = await getApi(`${api}categories/womens?secretKey=${secretKey}`);
//     const subClothing = await getApi(`${api}categories/parent/womens-clothing?secretKey=${secretKey}`);
//     const subJewlery = await getApi(`${api}categories/parent/womens-jewlery?secretKey=${secretKey}`);
//     const subAccessories = await getApi(`${api}categories/parent/womens-accessories?secretKey=${secretKey}`);

    
//     res.render('womens', {
//       mainName: main.data.name,
//       mainDescription: main.data.page_description,
//       subDataClothing: subClothing.data,
//       subDataAccessories: subAccessories.data,
//       subDataJewlery: subJewlery.data
//     })

//   } catch (err) { next(err) }

// })

module.exports = router;
