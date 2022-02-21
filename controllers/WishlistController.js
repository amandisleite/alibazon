const { WishlistServices } = require('../services');
const { CategoriesServices, Services } = require('../services');

class WishlistController {
    
    static async getWishlist(req, res, next) {
      let wishlistProductId = 0;
      let quantityProduct = 0;
      const productsQuantities = [];
      const productsPrices = [];
      const wishlistProductsId = [];
      const wishlistVariantsId = [];
      const productList = [];
      const colorProducts = [];

      try {
          const wishlist = await WishlistServices.getDataWishlist(req.cookies.token);
          
          const wishlistProducts = wishlist.data.items
          for (let eachProduct of wishlistProducts) {
              wishlistProductId = eachProduct.productId
              let priceProduct = eachProduct.variant.price
              const variantId = eachProduct.variant.product_id
              quantityProduct = eachProduct.quantity
              priceProduct = priceProduct * quantityProduct
              let colorProduct = eachProduct.variant.variation_values.color

              colorProducts.push({
                color: colorProduct,
                variantId: variantId
              })
              productsQuantities.push(quantityProduct)
              wishlistProductsId.push(wishlistProductId)
              productsPrices.push(priceProduct)
              wishlistVariantsId.push(variantId)
          }

          for (let productId of wishlistProductsId) {
              const product = await CategoriesServices.getDataOneProduct(productId);
              productList.push(product.data)
          }

          const imagesLinks = WishlistServices.checkIfVariantImageExists(wishlistVariantsId, productList, colorProducts)

          let totalPrice = 0;
          productsPrices.forEach(price => {
            totalPrice += price
          })

          res.render('wishlist', {
            productList,
            productsQuantities,
            totalPrice,
            wishlistVariantsId,
            imagesLinks
          })
        
        } catch (err) { next(err) }
    }

    static async addItemToWishlist(req, res, next) {
      const item = req.body;
      const { idProduct } = req.params;
      let variantId = 0

      try {
        const product = await CategoriesServices.getDataOneProduct(idProduct);
        const productData = product.data[0]
        const productVariants = productData.variants
        for (let variant of productVariants) {
          const values = variant.variation_values
          if (item.color) {
            if (item.color === values.color && item.size === values.size && item.width === values.width) {
              variantId = variant.product_id
            }
          }
        }
        
        const items = WishlistServices.wishlistItem(idProduct, variantId, '1')
        await WishlistServices.sendDataWishlist(items, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }

    static async deleteItemFromWishlist(req, res, next) {
      const variantId = req.body.variantId;
      let wishlistProductId = [];

      try {
        const wishlist = await WishlistServices.getDataWishlist(req.cookies.token);
        const wishlistProducts = wishlist.data.items

        for (let eachProduct of wishlistProducts) {
          let eachProductVariant = eachProduct.variant.product_id
          if (eachProductVariant === variantId) {
            wishlistProductId.push(eachProduct.productId)
          }
        }
        
        const itemToBeDeleted = WishlistServices.deleteWishlistItem(wishlistProductId[0], variantId)
        await WishlistServices.deleteDataWishlist(itemToBeDeleted, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }

    static async changeQuantityOfItemFromWishlist(req, res, next) {
      const variantId = req.params.idVariant;
      const quantity = req.body.quantityProduct;
      let wishlistProductId = [];

      try {
        const wishlist = await WishlistServices.getDataWishlist(req.cookies.token);
        const wishlistProducts = wishlist.data.items

        for (let eachProduct of wishlistProducts) {
          let eachProductVariant = eachProduct.variant.product_id
          if (eachProductVariant === variantId) {
            wishlistProductId.push(eachProduct.productId)
          }
        }
        
        const itemToBeChanged = WishlistServices.wishlistItem(wishlistProductId[0], variantId, quantity)
        await WishlistServices.changeQuantityWishlist(itemToBeChanged, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }


}
   
module.exports = WishlistController;
