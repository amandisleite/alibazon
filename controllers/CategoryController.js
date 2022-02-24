const { CategoriesServices } = require('../services');

class CategoryController {
    
    static async getParentCategories(req, res, next) {
        const category = req.params.category;
        const subcategories = ['clothing', 'accessories', 'jewelry'];

        try {
            const main = await CategoriesServices.getDataMainCategories(category);
            const parentResults = await CategoriesServices.getEachParentCategoryResult(category, subcategories);
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
    
        try {
            const subResults = await CategoriesServices.getEachSubcategoryResult(category, subcategories)
            const parentResults = await CategoriesServices.getEachParentCategoryResult(category, subcategories);
            CategoriesServices.checkImage(subResults, parentResults)
            let categoryIdWithProductError = await CategoriesServices.checkIfTheresProduct(subResults)
            const idMainCategory = CategoriesServices.returnMainCategoryId(category, mainCategory)
            
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

        try {
            const products = await CategoriesServices.getDataAllProducts(idSubcategory)
            const subcat = await CategoriesServices.getSpecificSubcategoryResult(idSubcategory)
            const subcategory = CategoriesServices.checkSubcatNameId(idSubcategory)

            res.render('product', {
                subcat,
                products: products.data,
                category,
                mainCategory,
                subcategory,
                idSubcategory
            })
            
        } catch (err) { next(err) }
    }

    static async getOneProduct(req, res, next) {
        const { category, mainCategory, idSubcategory, idProduct } = req.params;

        try {
            const idMainCategory = CategoriesServices.returnMainCategoryId(category, mainCategory)
            const subcategory = CategoriesServices.checkSubcatNameId(idSubcategory)
            const product = await CategoriesServices.getProductResult(idProduct);

            const variantsColors = CategoriesServices.getVariantColors(product)
            const variantsSizes = CategoriesServices.getVariantSizes(product)
            const variantsWidth = CategoriesServices.getVariantWidths(product)

            res.render('product-page', {
                product,
                category,
                mainCategory,
                idMainCategory,
                subcategory,
                idSubcategory,
                idProduct,
                variantsColors,
                variantsSizes,
                variantsWidth
            })
          
        } catch (err) { next(err) }
    }
}
   
module.exports = CategoryController;
