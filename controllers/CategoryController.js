const { CategoriesServices } = require('../services');

class CategoryController {
    
    static async getAllSubCategories(req, res, next) {
        const category = req.params.category;
        const subcategories = ['clothing', 'accessories', 'jewelry'];

        let subResults = [];
        let parentResults = [];

        try {
            const main = await CategoriesServices.getDataMainCategories(category);
            for (let subcat of subcategories) {
              const sub = await CategoriesServices.getDataSubcategories(category, subcat)
              subResults.push(sub.data)
            }

            for (let eachCat of subcategories) {
            const parentId = await CategoriesServices.getDataParentCategories(category, eachCat)
                if (parentId.data !== undefined) {
                  parentResults.push(parentId.data)
                }
        }

            CategoriesServices.checkImage(subResults, parentResults)
            let categoryIdWithProductError = await CategoriesServices.checkIfTheresProduct(subResults)

            res.render('category', {
              mainData: main.data,
              subResults,
              category,
              categoryIdWithProductError: categoryIdWithProductError[1],
              parentResults
            })

        } catch (err) { next(err) }
    }

    static async getAllProducts(req, res, next) {
        const { category, idSubcategory } = req.params;

        try {
            const products = await CategoriesServices.getDataAllProducts(idSubcategory);
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
            const productDetail = await CategoriesServices.getDataOneProduct(idProduct);
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
