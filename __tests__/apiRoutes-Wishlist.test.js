const app = require('../app');
const { WishlistServices, UserServices } = require('../services');

describe('Wishlist', () => {

    it('should add item to Wishlist', async () => {
        const user = UserServices.loginUser('teste3@gmail.com', '123456')
        const resUser = await UserServices.signIn(user)
        const token = resUser.data.token

        const wishlist = WishlistServices.wishlistItem('25592211', '701643843459', '3')
        
        const res = await WishlistServices.sendDataWishlist(wishlist, token)
        expect(res).toBeDefined()
        expect(res.data.items[0].productId).toBe('25592211')
        expect(res.config.method).toBe('post')

    })

    it('should return user Wishlist (that already exists) request', async () => {
        const user = UserServices.loginUser('teste3@gmail.com', '123456')
        const resUser = await UserServices.signIn(user)
        const token = resUser.data.token
        
        const res = await WishlistServices.getDataWishlist(token)
        expect(res.status).toBe(200)
        expect(res.data.items.length).toBeGreaterThanOrEqual(1)
    })

    it('should change quantity of item', async () => {
        const user = UserServices.loginUser('teste3@gmail.com', '123456')
        const resUser = await UserServices.signIn(user)
        const token = resUser.data.token

        const wishlist = WishlistServices.wishlistItem('25592211', '701643843459', '5')
        
        const res = await WishlistServices.changeQuantityWishlist(wishlist, token)
        expect(res).toBeDefined()
        expect(res.data.items[0].quantity).toBe(5)
        expect(res.config.method).toBe('post')

    })

    it('should delete item', async () => {
        const user = UserServices.loginUser('teste3@gmail.com', '123456')
        const resUser = await UserServices.signIn(user)
        const token = resUser.data.token

        const wishlist = WishlistServices.deleteWishlistItem('25592211', '701643843459')
        
        const res = await WishlistServices.deleteDataWishlist(wishlist, token)
        expect(res).toBeDefined()
        expect(res.data).toBe('')
        expect(res.config.method).toBe('delete')
    })

})