const { OrderServices, CartServices } = require('../services');
const { OrderNotAvailable } = require('../errors');

class OrderController {
    
    static async getOrder(req, res, next) {
        try {
            const orders = await OrderServices.getDataOrder(req.cookies.token)
            const orderData = OrderServices.returnItemsFromRequest(orders)
            
            if (orderData) {
                const everyPaymentId = OrderServices.getOrderPaymentId(orderData)
                const everyAddress = OrderServices.getOrderAddress(orderData)
                const productsPrices = OrderServices.getOrderPrice(orderData)
                const allOrders = await OrderServices.getOrderDetail(orderData)

                const allPaymentsIds = OrderServices.uniqueValuesAtArray(everyPaymentId)
                const allAddresses = OrderServices.uniqueValuesAtArray(everyAddress)
                const totalPrice = OrderServices.totalPricePerOrder(productsPrices)

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
            const cartProducts = CartServices.returnItemsFromRequest(cart);
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
