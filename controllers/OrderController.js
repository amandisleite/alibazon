const { OrderServices, CartServices } = require('../services');
const { CategoriesServices } = require('../services');

const api = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

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
            const orders = await OrderServices.getOrderData(`${api}/orders?secretKey=${secretKey}`, req.cookies.token)
            const orderData = orders.data
            
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
            
            const allPaymentsIds = [];
            for (let paymentOrder of everyPaymentId) {
              paymentOrder = [...new Set(paymentOrder)]
              allPaymentsIds.push(paymentOrder)
            }

            const allAddresses = [];
            for (let addressOrder of everyAddress) {
              addressOrder = [...new Set(addressOrder)]
              allAddresses.push(addressOrder)
            }

            const totalPrice = [];
            for (let priceOrder of productsPrices) {
              let totalPricePerOrder = 0;
              priceOrder.forEach(price => {
                totalPricePerOrder += price
              })
              totalPrice.push(totalPricePerOrder)
            }

            res.render('oldOrders', {
              allOrders,
              totalPrice,
              allAddresses,
              allPaymentsIds
            })
            
        } catch (err) { next(err) }
    }

    static async createOrder(req, res, next) {
      const address = req.body.address;
      let paymentId = 0;

      try {
        const cart = await CartServices.getCartData(`${api}/cart?secretKey=${secretKey}`, req.cookies.token);
        const cartProducts = cart.data.items

        const olderOrders = await OrderServices.getOrderData(`${api}/orders?secretKey=${secretKey}`, req.cookies.token)
        if (olderOrders.data.length > 0) {
          console.log(olderOrders.data.length)
          paymentId = olderOrders.data.length
        } else {
          paymentId = 1;
        }

        const newOrder = OrderServices.createOrder(address, paymentId, cartProducts)

        const order = await OrderServices.sendOrderData(`${api}orders`, newOrder, req.cookies.token)
        const orderData = order.data

        res.render('orders', {
          orderData
        })
      
      } catch (err) { next(err) }
    }

}
   
module.exports = OrderController;
