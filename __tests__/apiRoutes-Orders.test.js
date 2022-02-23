const app = require('../app');
const { OrderServices, UserServices } = require('../services');

describe('Orders', () => {

    it('should add item to Order', async () => {
        const user = UserServices.loginUser('teste2@gmail.com', '123456')
        const resUser = await UserServices.signIn(user)
        const token = resUser.data.token

        const items = [
            {
              "variant": {
                "variation_values": {
                  "color": "C43",
                  "size": "33"
                },
                "price": 145,
                "product_id": "883360544250",
                "orderable": true
              },
              "_id": "5e7abe59ffc73c0e4453aa65",
              "productId": "86736845",
              "quantity": 3
            }
          ]

        const order = OrderServices.createOrder('address', '1', items)
        
        const res = await OrderServices.sendDataOrder(order, token)
        expect(res).toBeDefined()
        expect(res.data.items[0].productId).toBe('86736845')

    })

    it('should return user Order (that already exists) request', async () => {
        const user = UserServices.loginUser('teste2@gmail.com', '123456')
        const resUser = await UserServices.signIn(user)
        const token = resUser.data.token
        
        const res = await OrderServices.getDataOrder(token)
        expect(res.status).toBe(200)
        expect(res.data.length).toBeGreaterThanOrEqual(1)
    })

})