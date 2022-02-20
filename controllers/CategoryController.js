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
            if (subcategory.length === 4) {
              subcategory = `${subcategory[2]} ${subcategory[3]}`
            }
            const product = productDetail.data[0]
            
            let allVariantsColors = [];
            let allVariantsSizes = [];
            let allVariantsWidth = [];
            let variantsColors = [];
            let variantsSizes = [];
            let variantsWidth = [];
            
            for (let variantionAttributes of product.variation_attributes) {
                if (variantionAttributes.id === 'color') {
                  for (let variant of product.variants) {
                    for (let value of variantionAttributes.values) {
                      if (variant.variation_values.color === value.value) {
                        allVariantsColors.push({
                          name: value.name,
                          value: value.value
                        })
                      }
                    }
                  }
                }

                if (variantionAttributes.id === 'size') {
                  for (let variant of product.variants) {
                    for (let value of variantionAttributes.values) {
                      if (variant.variation_values.size === value.value) {
                        allVariantsSizes.push({
                          name: value.name,
                          value: value.value
                        })
                      }
                    }
                  }
                }

                if (variantionAttributes.id === 'width') {
                  for (let variant of product.variants) {
                    for (let value of variantionAttributes.values) {
                      if (variant.variation_values.width === value.value) {
                        allVariantsWidth.push({
                          name: value.name,
                          value: value.value
                        })
                      }
                    }
                  }
                }
            }

            function removeDuplicatesObjects(arr, comp) {
            const uniqueArray =  arr.map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
           .filter((e) => arr[e]).map(e => arr[e]);
            return uniqueArray;
            }

            variantsColors = removeDuplicatesObjects(allVariantsColors, 'value');
            variantsSizes = removeDuplicatesObjects(allVariantsSizes, 'value');
            variantsWidth = removeDuplicatesObjects(allVariantsWidth, 'value');

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
