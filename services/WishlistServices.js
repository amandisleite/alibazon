const Services = require('./Services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

class WishlistServices extends Services {
    static wishlistItem(product, variant, quantity) {
        const data = {
            secretKey: secretKey,
            productId: product,
            variantId: variant,
            quantity: quantity
        }
        return data;
    }

    static deleteWishlistItem(product, variant) {
        const data = {
            secretKey: secretKey,
            productId: product,
            variantId: variant
        }
        return data;
    }

    static async getDataWishlist(token) {
        return Services.getDataToken(`${api}wishlist?secretKey=${secretKey}`, token)
    }

    static async sendDataWishlist(items, token) {
        return Services.sendDataToken(`${api}wishlist/addItem`, items, token)
    }

    static async changeQuantityWishlist(items, token) {
        return Services.sendDataToken(`${api}wishlist/changeItemQuantity`, items, token)
    }

    static async deleteDataWishlist(items, token) {
        return Services.deleteDataToken(`${api}wishlist/removeItem`, items, token)
    }
}

module.exports = WishlistServices;