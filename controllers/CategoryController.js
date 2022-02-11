const { CategoriesServices } = require('../services');

class CategoryController {
    
    static async getParentCategories(req, res, next) {
        const category = req.params.category;
        const subcategories = ['clothing', 'accessories', 'jewelry'];

        let parentResults = [];

        try {
            const main = await CategoriesServices.getDataMainCategories(category);
            for (let eachCat of subcategories) {
            const parentId = await CategoriesServices.getDataParentCategories(category, eachCat)
                if (parentId.data !== undefined) {
                  parentResults.push(parentId.data)
                }
            }
            CategoriesServices.checkImage('', parentResults)

            res.render('parentCategory', {
              mainData: main.data,
              category,
              parentResults
            })

        } catch (err) { next(err) }
    }

    static async getAllSubCategories(req, res, next) {
      const { category, mainCategory } = req.params;
      const subcategories = ['clothing', 'accessories', 'jewelry'];

      let subResults = [];

      try {
          for (let subcat of subcategories) {
            const sub = await CategoriesServices.getDataSubcategories(category, subcat)
            subResults.push(sub.data)
          }

          CategoriesServices.checkImage(subResults, '')
          let categoryIdWithProductError = await CategoriesServices.checkIfTheresProduct(subResults)
          CategoriesServices.checkSubcatId(subResults)

          const idMainCategory = `${category}-${mainCategory}`

          res.render('subcategory', {
            subResults,
            category,
            idMainCategory,
            mainCategory,
            categoryIdWithProductError: categoryIdWithProductError[1]
          })

      } catch (err) { next(err) }
  }

    static async getAllProducts(req, res, next) {
        const { category, mainCategory, subcategory } = req.params;

        try {
            const idSubcategory = `${category}-${mainCategory}-${subcategory}`
            const idMainCategory = `${category}-${mainCategory}`
            const products = await CategoriesServices.getDataAllProducts(idSubcategory);

            res.render('product', {
              products: products.data,
              category,
              mainCategory,
              idMainCategory,
              subcategory,
              idSubcategory
              })
          
        } catch (err) { next(err) }
    }

    static async getOneProduct(req, res, next) {
        const { category, mainCategory, subcategory, idProduct } = req.params;

        try {
            const productDetail = await CategoriesServices.getDataOneProduct(idProduct);
            const idSubcategory = `${category}-${mainCategory}-${subcategory}`
            const idMainCategory = `${category}-${mainCategory}`

            res.render('product-page', {
              product: productDetail.data[0],
              category,
              mainCategory,
              idMainCategory,
              subcategory,
              idSubcategory,
              idProduct
            })
          
        } catch (err) { next(err) }
    }
}
   
module.exports = CategoryController;
