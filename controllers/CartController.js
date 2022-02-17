const { CartServices } = require('../services');
const { CategoriesServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CartController {
    
    static async getCart(req, res, next) {
        try {
          const cart = await CartServices.getCartData(`${api}cart?secretKey=${secretKey}`);
          
          console.log(cart)
          res.render('cart', {
            cart
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

          res.render('cart', {
            item,
            variantId,
            idProduct,
            productData
          })
        
        } catch (err) { next(err) }
      }

    }
   
    module.exports = CartController;
