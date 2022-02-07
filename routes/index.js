var express = require('express');
var router = express.Router();
const MenController = require('../controllers/MenController');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/mens', MenController.getMensCategories)

router.get('/womens', async (req, res, next) => {
  try {
    const main = await getApi(`${api}categories/womens?secretKey=${secretKey}`);
    const subClothing = await getApi(`${api}categories/parent/womens-clothing?secretKey=${secretKey}`);
    const subJewlery = await getApi(`${api}categories/parent/womens-jewlery?secretKey=${secretKey}`);
    const subAccessories = await getApi(`${api}categories/parent/womens-accessories?secretKey=${secretKey}`);

    
    res.render('womens', {
      mainName: main.data.name,
      mainDescription: main.data.page_description,
      subDataClothing: subClothing.data,
      subDataAccessories: subAccessories.data,
      subDataJewlery: subJewlery.data
    })

  } catch (err) { next(err) }

})

module.exports = router;
