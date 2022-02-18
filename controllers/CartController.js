const { CartServices } = require('../services');
const { CategoriesServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CartController {
    
    static async getCart(req, res, next) {
        let cartProductId = 0;
        let quantityProduct = 0;
        const productsPrices = [];
        const cartProductsId = [];
        const cartVariantsId = [];
        const productList = [];

        try {
          const cart = await CartServices.getCartData(`${api}/cart?secretKey=${secretKey}`, req.cookies.token);
          const cartProducts = cart.data.items

          for (let eachProduct of cartProducts) {
            cartProductId = eachProduct.productId
            const priceProduct = eachProduct.variant.price
            const variantId = eachProduct.variant.product_id
            quantityProduct = eachProduct.quantity
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

          res.render('cart', {
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
        
        const items = CartServices.createCartItem(idProduct, variantId, '1')
        await CartServices.sendCartData(`${api}cart/addItem`, items, req.cookies.token);

        res.redirect('/cart')
      
      } catch (err) { next(err) }
    }

    static async deleteItemFromCart(req, res, next) {
      console.log(req.body)

     
    }

}
   
module.exports = CartController;
