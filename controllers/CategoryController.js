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
        let parentResults = [];

        try {
            for (let subcat of subcategories) {
              const sub = await CategoriesServices.getDataSubcategories(category, subcat)
              subResults.push(sub.data)
            }

            const parentId = await CategoriesServices.getDataParentCategories(category, mainCategory)
            parentResults.push(parentId.data)

            CategoriesServices.checkImage(subResults, parentResults)
            let categoryIdWithProductError = await CategoriesServices.checkIfTheresProduct(subResults)
            // CategoriesServices.checkSubcatId(subResults)

            const idMainCategory = `${category}-${mainCategory}`
            
            res.render('subcategory', {
                subResults,
                parentResults,
                category,
                idMainCategory,
                mainCategory,
                categoryIdWithProductError: categoryIdWithProductError[1]
            })

        } catch (err) { next(err) }
    }

    static async getAllProducts(req, res, next) {
        const { category, mainCategory, idSubcategory } = req.params;
        let subResults = [];

        try {
            const products = await CategoriesServices.getDataAllProducts(idSubcategory)
            const sub = await CategoriesServices.getDataSpecificSubcategory(idSubcategory)
            subResults.push(sub.data)
            const subcat = subResults[0]
                        
            // const idMainCategory = `${category}-${mainCategory}`
            let subcategory = idSubcategory.split('-')
            if (subcategory.length === 2) {
              subcategory = subcategory[1]
            }
            if (subcategory.length === 3) {
              subcategory = subcategory[2]
            }

            res.render('product', {
                subcat,
                products: products.data,
                category,
                mainCategory,
                // idMainCategory,
                subcategory,
                idSubcategory
            })
            
        } catch (err) { next(err) }
    }

    static async getOneProduct(req, res, next) {
        const { category, mainCategory, idSubcategory, idProduct } = req.params;

        try {
            const productDetail = await CategoriesServices.getDataOneProduct(idProduct);
            const idMainCategory = `${category}-${mainCategory}`
            let subcategory = idSubcategory.split('-')
            if (subcategory.length === 2) {
              subcategory = subcategory[1]
            }
            if (subcategory.length === 3) {
              subcategory = subcategory[2]
            }

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
