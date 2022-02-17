const Services = require('./Services');
const secretKey = process.env.SECRET_KEY;

class CartServices extends Services {
    static createCartItem(product, variant, quantity) {
        const data = {
            secretKey: secretKey,
            productId: product,
            variantId: variant,
            quantity: quantity
        }
        return data;
    }
}

module.exports = CartServices;