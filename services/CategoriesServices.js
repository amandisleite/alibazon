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
}

module.exports = CategoriesServices;