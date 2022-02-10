const { CategoriesServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CategoryController {
    
    static async getAllSubCategories(req, res, next) {
        const category = req.params.category;
        const subcategories = ['clothing', 'accessories', 'jewelry'];

        try {
          const main = await CategoriesServices.getData(`${api}categories/${category}?secretKey=${secretKey}`);
          let subResults = [];

          for (let subcat of subcategories) {
            const sub = await CategoriesServices.getData(`${api}categories/parent/${category}-${subcat}?secretKey=${secretKey}`)
            subResults.push(sub.data)
          }

          for (let i in subResults) {
            subResults[i].forEach(subcat => {
              if (subcat.image.includes('categories/category_404.png')) {
                console.log('img 404')
                subcat.image = null
            }}) 
          }
          
          res.render('category', {
            mainData: main.data,
            subResults,
            category
          })
      
        } catch (err) { next(err) }
      }

      static async getAllProducts(req, res, next) {
        const { category, idSubcategory } = req.params;

        try {
          const products = await CategoriesServices.getData(`${api}products/product_search?primary_category_id=${idSubcategory}&secretKey=${secretKey}`);
          const subcategory = idSubcategory.split('-').join(' ')

          res.render('product', {
            products: products.data,
            category,
            subcategory,
            idSubcategory
           })
        
        } catch (err) { next(err) }
      }

      static async getOneProduct(req, res, next) {
        const { category, idSubcategory, idProduct } = req.params;

        try {
          const productDetail = await CategoriesServices.getData(`${api}products/product_search?id=${idProduct}&secretKey=${secretKey}`);
          const subcategory = idSubcategory.split('-').join(' ')

          res.render('product-page', {
            product: productDetail.data[0],
            category,
            subcategory,
            idSubcategory,
            idProduct
           })
        
        } catch (err) { next(err) }
      }
    }
    
    module.exports = CategoryController;
