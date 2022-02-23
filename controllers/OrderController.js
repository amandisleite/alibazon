const { OrderNotAvailable } = require('../errors');
const { OrderServices, CartServices, CategoriesServices } = require('../services');

class OrderController {
    
    static async getOrder(req, res, next) {
        let eachProductId = 0;
        let quantityProduct = 0;
        let paymentId = 0;
        let address = 0;
        const productsPrices = [];
        let productObj = {};
        let priceProduct = 0;
        const allOrders = [];
        const everyAddress = [];
        const everyPaymentId = [];

        try {
            const orders = await OrderServices.getDataOrder(req.cookies.token)
            const orderData = orders.data
            
            if (orderData) {
                for (let orderItems of orderData) {
                    const orderItem = orderItems.items
                    paymentId = orderItems.paymentId
                    address = orderItems.address
                    const perOrder = [];
                    const pricePerOrder = [];
                    const addressPerOrder = [];
                    const paymentIdPerOrder = [];
                    for (let eachProduct of orderItem) {
                        eachProductId = eachProduct.productId
                        priceProduct = eachProduct.variant.price
                        quantityProduct = eachProduct.quantity
                        priceProduct = priceProduct * quantityProduct
                        pricePerOrder.push(priceProduct)
                        addressPerOrder.push(address)
                        paymentIdPerOrder.push(paymentId)

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
                everyPaymentId.push(paymentIdPerOrder)
                everyAddress.push(addressPerOrder)
                productsPrices.push(pricePerOrder)
                allOrders.push(perOrder)
                }

                const allPaymentsIds = OrderServices.uniqueValuesAtArray(everyPaymentId)
                const allAddresses = OrderServices.uniqueValuesAtArray(everyAddress)
                const totalPrice = OrderServices.totalPrice(productsPrices)

                res.render('oldOrders', {
                    orderData,
                    allOrders,
                    totalPrice,
                    allAddresses,
                    allPaymentsIds
                })

            } else {
                throw new OrderNotAvailable();
            }
            
        } catch (err) { next(err) }
    }

    static async createOrder(req, res, next) {
        const address = req.body.address;

        try {
            const cart = await CartServices.getDataCart(req.cookies.token);
            const cartProducts = cart.data.items

            const olderOrders = await OrderServices.getDataOrder(req.cookies.token)
            const paymentId = OrderServices.createPaymentId(olderOrders)

            const newOrder = OrderServices.createOrder(address, paymentId, cartProducts)

            const order = await OrderServices.sendDataOrder(newOrder, req.cookies.token)
            const orderData = order.data

            res.render('orders', {
              orderData
            })
        
        } catch (err) { next(err) }
    }

}
   
module.exports = OrderController;
