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
            subResults,
            category
          })
        
        } catch (err) { next(err) }
      }

      static async getAllProducts(req, res, next) {
        const { category, idSubCategory } = req.params;

        try {
          const products = await CategoriesServices.getData(`${api}products/product_search?primary_category_id=${idSubCategory}&secretKey=${secretKey}`);
          
          const subCategory = idSubCategory.split('-').join(' ')

          res.render('product', {
            products: products.data,
            category,
            subCategory
           })
        
        } catch (err) { next(err) }
      }

      static async getOneProduct(req, res, next) {
        const { category, idSubCategory, idProduct } = req.params;

        try {
          const productDetail = await CategoriesServices.getData(`${api}products/product_search?${idProduct}&secretKey=${secretKey}`);

          console.log(productDetail)

          res.render('product', {
            product: productDetail.data,
            idSubCategory,
            category
           })
        
        } catch (err) { next(err) }
      }
    }
    
    module.exports = CategoryController;
