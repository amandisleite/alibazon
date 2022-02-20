const { WishlistServices } = require('../services');
const { CategoriesServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class WishlistController {
    
    static async getCart(req, res, next) {
        let cartProductId = 0;
        let quantityProduct = 0;
        const productsPrices = [];
        const cartProductsId = [];
        const cartVariantsId = [];
        const productList = [];

        try {
          const cart = await WishlistServices.getCartData(`${api}/wishlist?secretKey=${secretKey}`, req.cookies.token);

          const cartProducts = cart.data.items
          for (let eachProduct of cartProducts) {
            cartProductId = eachProduct.productId
            let priceProduct = eachProduct.variant.price
            const variantId = eachProduct.variant.product_id
            quantityProduct = eachProduct.quantity
            priceProduct = priceProduct * quantityProduct
            cartProductsId.push(cartProductId)
            productsPrices.push(priceProduct)
            cartVariantsId.push(variantId)
          }
          for (let productId of cartProductsId) {
            const product = await CategoriesServices.getDataOneProduct(productId);
            productList.push(product.data)
          }
          
          let totalPrice = 0;
          productsPrices.forEach(price => {
            totalPrice += price
          })

          res.render('wishlist', {
            productList,
            quantityProduct,
            totalPrice,
            cartVariantsId
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
        
        const items = WishlistServices.cartItem(idProduct, variantId, '1')
        await WishlistServices.sendCartData(`${api}wishlist/addItem`, items, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }

    static async deleteItemFromCart(req, res, next) {
      const variantId = req.body.variantId;
      let cartProductId = [];

      try {
        const cart = await WishlistServices.getCartData(`${api}/wishlist?secretKey=${secretKey}`, req.cookies.token);
        const cartProducts = cart.data.items

        for (let eachProduct of cartProducts) {
          let eachProductVariant = eachProduct.variant.product_id
          if (eachProductVariant === variantId) {
            cartProductId.push(eachProduct.productId)
          }
        }
        
        const itemToBeDeleted = WishlistServices.deleteCartItem(cartProductId[0], variantId)
        await WishlistServices.deleteItemCartData(`${api}/wishlist/removeItem`, itemToBeDeleted, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }

    static async changeQuantityOfItemFromCart(req, res, next) {
      const variantId = req.params.idVariant;
      const quantity = req.body.quantityProduct;
      let cartProductId = [];

      try {
        const cart = await WishlistServices.getCartData(`${api}/wishlist?secretKey=${secretKey}`, req.cookies.token);
        const cartProducts = cart.data.items

        for (let eachProduct of cartProducts) {
          let eachProductVariant = eachProduct.variant.product_id
          if (eachProductVariant === variantId) {
            cartProductId.push(eachProduct.productId)
          }
        }
        
        const itemToBeChanged = WishlistServices.cartItem(cartProductId[0], variantId, quantity)
        await WishlistServices.sendCartData(`${api}/wishlist/changeItemQuantity`, itemToBeChanged, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }


}
   
module.exports = WishlistController;
