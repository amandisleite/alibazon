var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  res.render('index');
});

const api = "https://osf-digital-backend-academy.herokuapp.com/api/"
const secretKey = "$2a$08$QOu/RAl4bzs8fGWCYpiN5eYOMfPd2Nwmp4zlL3GPVp/RRkn3Mlgny"

async function getApi(url) {
    const response = await axios(url);
    return response;
}

router.get('/categories/mens', async (req, res, next) => {
  try {
    const main = await getApi(`${api}categories/mens?secretKey=${secretKey}`);
    const subClothing = await getApi(`${api}categories/parent/mens-clothing?secretKey=${secretKey}`);
    const subAccessories = await getApi(`${api}categories/parent/mens-accessories?secretKey=${secretKey}`);
    
    res.render('index', {
      mainName: main.data.name,
      mainDescription: main.data.page_description,
      subDataClothing: subClothing.data,
      subDataAccessories: subAccessories.data
    })

  } catch (err) { next(err) }

})

module.exports = router;
