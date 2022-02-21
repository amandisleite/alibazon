const Services = require('./Services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class CartServices extends Services {
    static cartItem(product, variant, quantity) {
        const data = {
            secretKey: secretKey,
            productId: product,
            variantId: variant,
            quantity: quantity
        }
        return data;
    }

    static deleteCartItem(product, variant) {
        const data = {
            secretKey: secretKey,
            productId: product,
            variantId: variant
        }
        return data;
    }

    static async getDataCart(token) {
        return Services.getDataToken(`${api}/cart?secretKey=${secretKey}`, token)
    }

    static async sendDataCart(items, token) {
        return Services.sendDataToken(`${api}cart/addItem`, items, token)
    }

    static async changeQuantityCart(items, token) {
        return Services.sendDataToken(`${api}cart/changeItemQuantity`, items, token)
    }

    static async deleteDataCart(items, token) {
        return Services.deleteDataToken(`${api}/cart/removeItem`, items, token)
    }
}

module.exports = CartServices;