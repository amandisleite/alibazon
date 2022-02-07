var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  res.render('index');
});

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

async function getApi(url) {
    const response = await axios(url);
    return response;
}

router.get('/mens', async (req, res, next) => {
  try {
    const main = await getApi(`${api}categories/mens?secretKey=${secretKey}`);
    const subClothing = await getApi(`${api}categories/parent/mens-clothing?secretKey=${secretKey}`);
    const subAccessories = await getApi(`${api}categories/parent/mens-accessories?secretKey=${secretKey}`);
    
    res.render('mens', {
      mainName: main.data.name,
      mainDescription: main.data.page_description,
      subDataClothing: subClothing.data,
      subDataAccessories: subAccessories.data
    })

  } catch (err) { next(err) }

})

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
