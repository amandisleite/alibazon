const app = require('../app');
const { CartServices, UserServices } = require('../services');

describe('Cart', () => {

    it('should add item to Cart', async () => {
        const resUser = await UserServices.signIn('teste2@gmail.com', '123456')
        const token = resUser.data.token

        const cart = CartServices.cartItem('25592211', '701643843459', '3')
        
        const res = await CartServices.sendDataCart(cart, token)
        expect(res).toBeDefined()
        expect(res.data.items[0].productId).toBe('25592211')
        expect(res.config.method).toBe('post')

    })

    it('should return user Cart (that already exists) request', async () => {
        const resUser = await UserServices.signIn('teste2@gmail.com', '123456')
        const token = resUser.data.token
        
        const res = await CartServices.getDataCart(token)
        expect(res.status).toBe(200)
        expect(res.data.items.length).toBeGreaterThanOrEqual(1)
    })

    it('should change quantity of item', async () => {
        const resUser = await UserServices.signIn('teste2@gmail.com', '123456')
        const token = resUser.data.token

        const cart = CartServices.cartItem('25592211', '701643843459', '5')
        
        const res = await CartServices.changeQuantityCart(cart, token)
        expect(res).toBeDefined()
        expect(res.data.items[0].quantity).toBe(5)
        expect(res.config.method).toBe('post')

    })

    it('should delete item', async () => {
        const resUser = await UserServices.signIn('teste2@gmail.com', '123456')
        const token = resUser.data.token

        const cart = CartServices.deleteCartItem('25592211', '701643843459')
        
        const res = await CartServices.deleteDataCart(cart, token)
        expect(res).toBeDefined()
        expect(res.data).toBe('')
        expect(res.config.method).toBe('delete')
    })

})