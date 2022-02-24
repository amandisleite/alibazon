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

    it('should be creating link undefined for product without variantion image', () => {
        const productList = require('./factories/productList')
        
        const colorProducts = [
            { color: 'C43', variantId: '883360544250' },
            { color: 'JJ2RVXX', variantId: '701643843442' },
            { color: 'Orange', variantId: '793775370033-1-1' }
        ]
        const variantsIds = [ '883360544250', '701643843442', '793775370033-1-1' ]

        const imagesLinks = CartServices.checkIfVariantImageExists(variantsIds, productList, colorProducts)
        expect(imagesLinks[2].link).toBe('undefined')
    
    })

    it('should be returning attribute items of object', () => {
        const obj = {
            data: {
                items: 'hello'
            }
        }
        const item = CartServices.returnItemsFromRequest(obj)
        expect(item).toBe('hello')
    })

    it('should be getting products ids', () => {
        const arr = require('./factories/cartArray')
        const res = CartServices.getProductsIds(arr)
        expect(res[2]).toBe(200)
    })

    it('should be getting variants ids', () => {
        const arr = require('./factories/cartArray')
        const res = CartServices.getVariantsIds(arr)
        expect(res[1]).toBe(2)
    })

    it('should be getting prices', () => {
        const arr = require('./factories/cartArray')
        const res = CartServices.getPrices(arr)
        expect(res[0]).toBe(20)
    })

    it('should be getting quantities', () => {
        const arr = require('./factories/cartArray')
        const res = CartServices.getQuantities(arr)
        expect(res[1]).toBe(1)
    })

    it('should be getting color of products', () => {
        const arr = require('./factories/cartArray')

        const res = CartServices.getColorOfProducts(arr)
        expect(res[2].color).toBe('c')
        expect(res[1].variantId).toBe(2)
    })

    it('should get all colors of all products', () => {
        const arr = require('./factories/productArray')
        const variants = [ '750518699660', '701643843428' ]

        const res = CartServices.getVariantColorInfo(arr, variants)
        expect(res[1].variantColor).toBe('Ivory & Black')
    })

    it('should get all sizes of all products', () => {
        const arr = require('./factories/productArray')
        const variants = [ '750518699660', '701643843428' ]

        const res = CartServices.getVariantSizeInfo(arr, variants)
        expect(res[1].variantSize).toBe('14')
    })

    it('should get all widths of all products', () => {
        const arr = require('./factories/productArray')
        const variants = [ '750518699660', '701643843428' ]

        const res = CartServices.getVariantWidthInfo(arr, variants)
        expect(res[0].variantWidth).toBe('Regular')
    })
    
})