const { ProductsDontExist } = require('../errors');
const { CategoriesServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;
let subResults = [];
let parentResults = [];
let positionOne = 0;
let positionTwo = 0;
let categoryIdWithProductError = ''

class CategoryController {
    
    static async getAllSubCategories(req, res, next) {
        const category = req.params.category;
        const subcategories = ['clothing', 'accessories', 'jewelry'];

        subResults = [];
        parentResults = [];

        try {
          const main = await CategoriesServices.getData(
            `${api}categories/${category}?secretKey=${secretKey}`);
          for (let subcat of subcategories) {
            const sub = await CategoriesServices.getData(
              `${api}categories/parent/${category}-${subcat}?secretKey=${secretKey}`)
            subResults.push(sub.data)
          }

          for (let eachCat of subcategories) {
          const parentId = await CategoriesServices.getData(
              `${api}categories/${category}-${eachCat}?secretKey=${secretKey}`)
              if (parentId.data !== undefined) {
                parentResults.push(parentId.data)
              }
        }

          checkImage()
          await checkIfTheresProduct()

          res.render('category', {
            mainData: main.data,
            subResults,
            category,
            categoryIdWithProductError,
            parentResults
          })

        } catch (err) { next(err) }
    }

    static async getAllProducts(req, res, next) {
      const { category, idSubcategory } = req.params;

      try {
        const products = await CategoriesServices.getData(
          `${api}products/product_search?primary_category_id=${idSubcategory}&secretKey=${secretKey}`);
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
        const productDetail = await CategoriesServices.getData(
          `${api}products/product_search?id=${idProduct}&secretKey=${secretKey}`);
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

  const checkImage = () => {
    for (let i in subResults) {
      subResults[i].forEach(subcat => {
        if (subcat.image === null) {
          subcat.image = 'categories/category_404.png'
        } if (subcat.image.includes('categories/category_404.png')) {
          subcat.image = null
        }
      })
    }

    for (let parent of parentResults) {
        if (parent.image === null || parent.image === undefined) {
          parent.image = 'categories/category_404.png'
        } if (parent.image.includes('categories/category_404.png')) {
          parent.image = null
        }
    }
  }
    
  const checkIfTheresProduct = async () => {
    for (let i in subResults) {
      const allProducts = await subResults[i].map(async subcat => {
  
        await CategoriesServices.getData(
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
    
  module.exports = CategoryController;
