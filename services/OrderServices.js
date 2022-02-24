const Services = require('./Services');
const CategoriesServices = require('./CategoriesServices')

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

    static uniqueValuesAtArray(array) {
        const uniqueValuesArray = [];
        for (let eachValue of array) {
            eachValue = [...new Set(eachValue)]
            uniqueValuesArray.push(eachValue)
        }
        return uniqueValuesArray
    }

    static totalPricePerOrder(arrayPrices) {
        const totalPrice = [];
        for (let priceOrder of arrayPrices) {
            let totalPricePerOrder = 0;
            priceOrder.forEach(price => {
                totalPricePerOrder += price
            })
            totalPrice.push(totalPricePerOrder)
        }
        return totalPrice;
    }

    static createPaymentId(orders) {
        let paymentId = 0;
        if (orders.data) {
            paymentId = orders.data.length + 1
        } else {
            paymentId = 1;
        }
        return paymentId;
    }

    static returnItemsFromRequest(request) {
        const allOrders = request.data
        return allOrders;
    }

    static getOrderPaymentId(orders) {
        const everyPaymentId = [];
        for (let orderItems of orders) {
            const orderItem = orderItems.items
            const paymentId = orderItems.paymentId
            const paymentIdPerOrder = [];
            for (let eachProduct of orderItem) {
                paymentIdPerOrder.push(paymentId)
            }
            everyPaymentId.push(paymentIdPerOrder)
        }
        return everyPaymentId;
    }

    static getOrderAddress(orders) {
        const everyAddress = [];
        for (let orderItems of orders) {
            const orderItem = orderItems.items
            const address = orderItems.address
            const addressPerOrder = [];
            for (let eachProduct of orderItem) {
                addressPerOrder.push(address)
            }
            everyAddress.push(addressPerOrder)
        }
        return everyAddress;
    }

    static getOrderPrice(orders) {
        const productsPrices = [];
        for (let orderItems of orders) {
            const orderItem = orderItems.items
            const pricePerOrder = [];
            for (let eachProduct of orderItem) {
                let priceProduct = eachProduct.variant.price
                const quantityProduct = eachProduct.quantity
                priceProduct = priceProduct * quantityProduct
                pricePerOrder.push(priceProduct)
            }
            productsPrices.push(pricePerOrder)
        }
        return productsPrices;
    }

    static async getOrderDetail(orders) {
        let productObj = 0;
        const allOrders = [];
        for (let orderItems of orders) {
            const orderItem = orderItems.items
            const paymentId = orderItems.paymentId
            const address = orderItems.address
            const perOrder = [];
            for (let eachProduct of orderItem) {
                const eachProductId = eachProduct.productId
                let priceProduct = eachProduct.variant.price
                const quantityProduct = eachProduct.quantity
                priceProduct = priceProduct * quantityProduct

                const product = await CategoriesServices.getDataOneProduct(eachProductId);
                productObj = {
                    productName: product.data[0].name,
                    productId: product.data[0].id,
                    price: priceProduct,
                    quantity: quantityProduct,
                    address: address, 
                    paymentId: paymentId
                }

                perOrder.push(productObj)

            }
            allOrders.push(perOrder)
        }
        return allOrders;
    }
}

module.exports = OrderServices;