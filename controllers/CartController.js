const { CartServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CartController {
    
    static async getCart(req, res, next) {
        try {
          const cart = await CartServices.getData(`${api}cart?secretKey=${secretKey}`);
          
          console.log(cart)
          res.render('cart', {
            cart
          })
        
        } catch (err) { next(err) }
      }

      static async addItemToCart(req, res, next) {
        const { product, variantName, variantValue } = req.params
        // const items = CartServices.createCartItem(product, variant, '1')
        console.log(product, variantName, variantValue)

        try {
          const addItem = await CartServices.sendData(`${api}cart/addItem`, items);
          
          console.log(addItem)
          res.render('cart', {
            cart
          })
        
        } catch (err) { next(err) }
      }

    }
   
    module.exports = CartController;
