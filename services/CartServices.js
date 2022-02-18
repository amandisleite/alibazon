const axios = require('axios');
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

    static async getCartData(url, token) {
        try {
            const response = await axios({
                method: 'get',
                url: url,
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response;
        } catch (err) {
            return { err: err.request.path };
        }
    }

    static async sendCartData(url, data, token) {
        try {
            const request = await axios({
                method: 'post',
                url: url,
                data: data,
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return request;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = CartServices;