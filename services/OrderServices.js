const axios = require('axios');
const Services = require('./Services');
const secretKey = process.env.SECRET_KEY;

class OrderServices extends Services {
    static createOrder(address, paymentId, items) {
        const data = {
            secretKey: secretKey,
            address: address,
            paymentId: paymentId,
            items: items
        }
        return data;
    }

    static async getOrderData(url, token) {
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

    static async sendOrderData(url, data, token) {
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

module.exports = OrderServices;