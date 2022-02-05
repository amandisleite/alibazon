var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  res.render('index');
});

const api = "https://osf-digital-backend-academy.herokuapp.com/api/"
const secretKey = "$2a$08$QOu/RAl4bzs8fGWCYpiN5eYOMfPd2Nwmp4zlL3GPVp/RRkn3Mlgny"

async function getapi(url) {
    const response = await axios(url);
    // const data = await response.express.json();
    console.log(response)
    return response;
}

router.get('/categories/mens', async (req, res, next) => {
  try {
    const mainCategory = await getapi(`${api}categories/mens?secretKey=${secretKey}`);
    const subCategory = await getapi(`${api}categories/parent/mens?secretKey=${secretKey}`);
    console.log(mainCategory)
    console.log(subCategory)
    res.render('index', {
      mainName: mainCategory.data.name,
      mainDescription: mainCategory.data.page_description,
      subData: subCategory.data,
      subName: subCategory.data.name,
      subDescription: subCategory.data.page_description,
      subImage: subCategory.data.image
     })

  } catch (err) { next(err) }

})

module.exports = router;
