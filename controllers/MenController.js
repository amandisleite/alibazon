const mensServices = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class MenController {
    static async getMensCategories(req, res, next) {
        try {
          const main = await mensServices.getData(`${api}categories/mens?secretKey=${secretKey}`);
          const subClothing = await mensServices.getData(`${api}categories/parent/mens-clothing?secretKey=${secretKey}`);
          const subAccessories = await mensServices.getData(`${api}categories/parent/mens-accessories?secretKey=${secretKey}`);
          
          res.render('mens', {
            mainName: main.data.name,
            mainDescription: main.data.page_description,
            subDataClothing: subClothing.data,
            subDataAccessories: subAccessories.data
          })
      
        } catch (err) { next(err) }
    }
}

module.exports = MenController;