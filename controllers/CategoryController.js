const { CategoriesServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CategoryController {
    
    static async getAllSubCategories(req, res, next) {
        const category = req.params.category;
        const subCategories = ['clothing', 'accessories', 'jewelry'];

        try {
          const main = await CategoriesServices.getData(`${api}categories/${category}?secretKey=${secretKey}`);
          let subResults = [];

          for (let subCat of subCategories) {
            const sub = await CategoriesServices.getData(`${api}categories/parent/${category}-${subCat}?secretKey=${secretKey}`)
            subResults.push(sub.data)
          }

          res.render('category', {
            mainData: main.data,
            subResults
          })
        
        } catch (err) { next(err) }
      }

      static async getAllProducts(req, res, next) {
        const id = req.params.id;

        try {
          const products = await CategoriesServices.getData(`${api}products/product_search?primary_category_id=${id}&secretKey=${secretKey}`);

          console.log(products)
          res.render(`${id}`, products)
        
        } catch (err) { next(err) }
      }
    }
    
    module.exports = CategoryController;
