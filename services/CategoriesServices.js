const Services = require('./Services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

let positionOne = 0;
let positionTwo = 0;
let categoryIdWithProductError = ''

class CategoriesServices extends Services {

    static async getDataMainCategories(category) {
        return Services.getData(`${api}categories/${category}?secretKey=${secretKey}`)
    }

    static async getDataParentCategories(category, eachCat) {
        return Services.getData(`${api}categories/${category}-${eachCat}?secretKey=${secretKey}`)
    }

    static async getDataSubcategories(category, subcat) {
        return Services.getData(`${api}categories/parent/${category}-${subcat}?secretKey=${secretKey}`)
    }

    static async getDataSpecificSubcategory(subcategory) {
        return Services.getData(`${api}categories/${subcategory}?secretKey=${secretKey}`)
    }

    static async getDataAllProducts(subcategory) {
        return Services.getData(`${api}products/product_search?primary_category_id=${subcategory}&secretKey=${secretKey}`)
    }

    static async getDataOneProduct(product) {
        return Services.getData(`${api}products/product_search?id=${product}&secretKey=${secretKey}`)
    }

    static checkImage(sub, main) {
        for (let i in sub) {
            sub[i].forEach(subcat => {
            if (subcat.image === null) {
            subcat.image = 'categories/category_404.png'
            } if (subcat.image.includes('categories/category_404.png')) {
            subcat.image = null
            }
        })
        }

        for (let parent of main) {
            if (parent.image === null || parent.image === undefined) {
            parent.image = 'categories/category_404.png'
            } if (parent.image.includes('categories/category_404.png')) {
            parent.image = null
            }
        }
        return
    }

    static checkSubcatId(sub) {
        for (let i in sub) {
            sub[i].forEach(subcat => {
                let arrayWithWords = subcat.id.split('-')
                if (arrayWithWords.length === 2) {
                    let arrayParentId = subcat.parent_category_id.split('-')[1]
                    let newSubcatId = arrayWithWords[0] + '-' + arrayParentId + '-' +  arrayWithWords[1] 
                    subcat.new_id = newSubcatId
                }
                if (arrayWithWords.length === 4) {
                    let subcatIdTogether = arrayWithWords[2] + arrayWithWords[3]
                    let newSubcatId = arrayWithWords[0] + '-' + arrayWithWords[1] + '-' + subcatIdTogether
                    subcat.new_id = newSubcatId
                }
                if (arrayWithWords.length === 3) {
                    subcat.new_id = subcat.id
                }
            })
        }
    }
    
    static async checkIfTheresProduct(sub) {
        for (let i in sub) {
        const allProducts = await sub[i].map(async subcat => {
    
            await Services.getData(
            `${api}products/product_search?primary_category_id=${subcat.id}&secretKey=${secretKey}`)
            .then(res => {
            const error = res.err
            if (typeof error !== 'undefined' || error !== undefined) {
                positionOne = error.indexOf('=')
                positionTwo = error.indexOf('&')
                categoryIdWithProductError = error.slice(positionOne + 1, positionTwo)
            }
            return categoryIdWithProductError
            }).catch(err => { err })
            
            return categoryIdWithProductError
        })
        const catId = await Promise.all(allProducts)
        .then(res => { return res })
    
        return catId
        }
    }

    static checkIfThereIsVariantsOfProduct(product) {
        const products = []
        const productData = product.data
        for (let eachProduct of productData) {
            if (eachProduct.variants.length !== 0 || eachProduct.variation_attributes.length !== 0) {
                products.push(eachProduct)
            }
        }
        return products;
    }

    static async getEachParentCategoryResult(category, subcategories) {
        const parentResults = [];
        for (let eachCat of subcategories) {
            const parentId = await CategoriesServices.getDataParentCategories(category, eachCat)
            if (parentId.data !== undefined) {
                parentResults.push(parentId.data)
            }
        }
        return parentResults;
    }

    static async getEachSubcategoryResult(category, subcategories) {
        const subResults = [];
        for (let subcat of subcategories) {
            const sub = await CategoriesServices.getDataSubcategories(category, subcat)
            subResults.push(sub.data)
        }
        return subResults;
    }

    static async getSpecificSubcategoryResult(idSubcategory) {
        const subResults = [];
        const sub = await CategoriesServices.getDataSpecificSubcategory(idSubcategory)
        subResults.push(sub.data)
        const subcat = subResults[0]
        return subcat;
    }

    static async getProductResult(idProduct) {
        const productDetail = await CategoriesServices.getDataOneProduct(idProduct);
        const product = productDetail.data[0]
        return product;
    }

    static checkSubcatNameId(idSubcategory) {
        let subcategoryString = idSubcategory.split('-')
        let subcategory = 0;
        
        if (subcategoryString.length === 2) {
            subcategory = subcategoryString[1]
        }
        if (subcategoryString.length === 3) {
            subcategory = subcategoryString[2]
        }
        if (subcategoryString.length === 4) {
            subcategory = `${subcategoryString[2]} ${subcategoryString[3]}`
        }
        return subcategory;
    }

    static returnMainCategoryId(category, mainCategory) {
        const idMainCategory = `${category}-${mainCategory}`
        return idMainCategory;
    }

    static getVariantColors(product) {
        const allVariantsColors = [];
        for (let variantionAttributes of product.variation_attributes) {
            if (variantionAttributes.name === 'color'  || variantionAttributes.name === 'Color') {
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
        }
        const variantsColors = this.removeDuplicatesObjects(allVariantsColors, 'value');
        return variantsColors;
    }

    static getVariantSizes(product) {
        const allVariantsSizes = [];
        for (let variantionAttributes of product.variation_attributes) {
            if (variantionAttributes.name === 'size' || variantionAttributes.name === 'Size') {
                for (let variant of product.variants) {
                    for (let value of variantionAttributes.values) {
                        if (variant.variation_values.size === value.value || variant.variation_values.accessorySize === value.value) {
                            allVariantsSizes.push({
                            name: value.name,
                            value: value.value
                            })
                        }
                    }
                }
            }
        }
        const variantsSizes = this.removeDuplicatesObjects(allVariantsSizes, 'value');
        return variantsSizes;
    }

    static getVariantWidths(product) {
        const allVariantsWidths = [];
        for (let variantionAttributes of product.variation_attributes) {
            if (variantionAttributes.name === 'width'  || variantionAttributes.name === 'Width') {
                for (let variant of product.variants) {
                    for (let value of variantionAttributes.values) {
                        if (variant.variation_values.width === value.value) {
                            allVariantsWidths.push({
                            name: value.name,
                            value: value.value
                            })
                        }
                    }
                }
            }
        }
        const variantsWidths = this.removeDuplicatesObjects(allVariantsWidths, 'value');
        return variantsWidths;
    }

    static removeDuplicatesObjects(arr, comp) {
        const uniqueArray =  arr.map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e]).map(e => arr[e]);
        return uniqueArray;
    }
}

module.exports = CategoriesServices;