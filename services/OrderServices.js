const Services = require('./Services');

const api = process.env.API_URL;
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

    static async getDataOrder(token) {
        return Services.getDataToken(`${api}/orders?secretKey=${secretKey}`, token)
    }

    static async sendDataOrder(order, token) {
        return Services.sendDataToken(`${api}orders`, order, token)
    }

    static uniqueValues(array) {
        const uniqueValuesArray = [];
        for (let eachValue of array) {
            eachValue = [...new Set(eachValue)]
            uniqueValuesArray.push(eachValue)
        }
        return uniqueValuesArray
    }
}

module.exports = OrderServices;