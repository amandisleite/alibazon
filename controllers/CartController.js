const { CartServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CartController {
    
    static async getCart(req, res, next) {
        try {
          const cart = await CategoriesServices.getData(`${api}cart?secretKey=${secretKey}`);
          
          console.log(cart)
          res.render('includes/cart', {
            mainData: main.data,
            subResults,
            category
          })
        
        } catch (err) { next(err) }
      }
    }
    
    module.exports = CartController;
