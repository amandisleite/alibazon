const CartServices = require('../services/CartServices');

describe('CartServices', () => {
   
    it('should be creating object of item', () => {
        const cart = CartServices.cartItem('25594785', '799927757417', '1')
        expect(cart.variantId).toBe('799927757417');
    })

    it('should be creating object of delete item', () => {
        const cart = CartServices.deleteCartItem('25594785', '799927757417')
        expect(cart.productId).toBe('25594785');
    })
})