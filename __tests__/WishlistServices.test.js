const WishlistServices = require('../services/WishlistServices');

describe('WishlistServices', () => {
   
    it('should be creating object of item', () => {
        const wishlist = WishlistServices.wishlistItem('25594785', '799927757417', '1')
        expect(wishlist.variantId).toBe('799927757417');
    })

    it('should be creating object of delete item', () => {
        const wishlist = WishlistServices.deleteWishlistItem('25594785', '799927757417')
        expect(wishlist.productId).toBe('25594785');
    })
})