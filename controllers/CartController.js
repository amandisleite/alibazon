const { CartServices } = require('../services');
const { CategoriesServices } = require('../services');
const WishlistServices = require('../services/WishlistServices');

class CartController {
    
    static async getCart(req, res, next) {
        let cartProductId = 0;
        let quantityProduct = 0;
        const productsQuantities = [];
        const productsPrices = [];
        const cartProductsId = [];
        const cartVariantsId = [];
        const productList = [];
        const colorProducts = [];

        try {
          const cart = await CartServices.getDataCart(req.cookies.token);

          const cartProducts = cart.data.items
          for (let eachProduct of cartProducts) {
            cartProductId = eachProduct.productId
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
            cartProductsId.push(cartProductId)
            productsPrices.push(priceProduct)
            cartVariantsId.push(variantId)
          }
          for (let productId of cartProductsId) {
            const product = await CategoriesServices.getDataOneProduct(productId);
            productList.push(product.data)
          }
          
          const imagesLinks = WishlistServices.checkIfVariantImageExists(cartVariantsId, productList, colorProducts)

          let totalPrice = 0;
          productsPrices.forEach(price => {
            totalPrice += price
          })

          res.render('cart', {
            productList,
            productsQuantities,
            totalPrice,
            cartVariantsId,
            imagesLinks
          })
        
        } catch (err) { next(err) }
    }

    static async addItemToCart(req, res, next) {
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

        if (req.headers.referer.includes('wishlist')) {
          const itemToBeDeleted = WishlistServices.deleteWishlistItem(idProduct, item.variantId)
          await WishlistServices.deleteDataWishlist(itemToBeDeleted, req.cookies.token);
        }
        
        let items = 0;
        if (item.quantityProduct) {
          items = CartServices.cartItem(idProduct, variantId, item.quantityProduct)
        } else {
          items = CartServices.cartItem(idProduct, variantId, '1')
        }
        await CartServices.sendDataCart(items, req.cookies.token);

        res.redirect('/cart')
      
      } catch (err) { next(err) }
    }

    static async deleteItemFromCart(req, res, next) {
      const variantId = req.body.variantId;
      let cartProductId = [];

      try {
        const cart = await CartServices.getDataCart(req.cookies.token);
        const cartProducts = cart.data.items

        for (let eachProduct of cartProducts) {
          let eachProductVariant = eachProduct.variant.product_id
          if (eachProductVariant === variantId) {
            cartProductId.push(eachProduct.productId)
          }
        }
        
        const itemToBeDeleted = CartServices.deleteCartItem(cartProductId[0], variantId)
        await CartServices.deleteDataCart(itemToBeDeleted, req.cookies.token);

        res.redirect('/cart')
      
      } catch (err) { next(err) }
    }

    static async changeQuantityOfItemFromCart(req, res, next) {
      const variantId = req.params.idVariant;
      const quantity = req.body.quantity;
      let cartProductId = [];

      try {
        const cart = await CartServices.getDataCart(req.cookies.token);
        const cartProducts = cart.data.items

        for (let eachProduct of cartProducts) {
          let eachProductVariant = eachProduct.variant.product_id
          if (eachProductVariant === variantId) {
            cartProductId.push(eachProduct.productId)
          }
        }
        
        const itemToBeChanged = CartServices.cartItem(cartProductId[0], variantId, quantity)
        await CartServices.changeQuantityCart(itemToBeChanged, req.cookies.token);

        res.redirect('/cart')
      
      } catch (err) { next(err) }
    }


}
   
module.exports = CartController;
