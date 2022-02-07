const { CategoriesServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CategoryController {
    
    static async getSubCategories(req, res, next) {
        const category = req.params.category;
        console.log(category)

        try {
          const main = await CategoriesServices.getData(`${api}categories/${category}?secretKey=${secretKey}`);
          const subClothing = await CategoriesServices.getData(`${api}categories/parent/${category}-clothing?secretKey=${secretKey}`);
          const subAccessories = await CategoriesServices.getData(`${api}categories/parent/${category}-accessories?secretKey=${secretKey}`);
          const subJewlery = await CategoriesServices.getData(`${api}categories/parent/${category}-jewlery?secretKey=${secretKey}`);
          
          res.render(`${category}`, {
            mainName: main.data.name,
            mainDescription: main.data.page_description,
            subDataClothing: subClothing.data,
            subDataAccessories: subAccessories.data,
            subDataJewlery: subJewlery.data
          })
      
        } catch (err) { next(err) }
    }
}

module.exports = CategoryController;