const { WishlistServices, CategoriesServices, CartServices } = require('../services');

class WishlistController {
    
    static async getWishlist(req, res, next) {
      try {
          const wishlist = await WishlistServices.getDataWishlist(req.cookies.token);
          
          const wishlistProducts = CartServices.returnItemsFromRequest(wishlist);
          const wishlistProductsId = CartServices.getProductsIds(wishlistProducts);
          const wishlistVariantsId = CartServices.getVariantsIds(wishlistProducts);
          const productsQuantities = CartServices.getQuantities(wishlistProducts);
          const productsPrices = CartServices.getPrices(wishlistProducts);
          const colorProducts = CartServices.getColorOfProducts(wishlistProducts);
          
          const productList = await CartServices.getProductsByProductsIds(wishlistProductsId);
          const imagesLinks = CartServices.checkIfVariantImageExists(wishlistVariantsId, productList, colorProducts);
          const totalPrice = CartServices.totalPrice(productsPrices);

          res.render('wishlist', {
            productList,
            productsQuantities,
            totalPrice,
            wishlistVariantsId,
            imagesLinks
          })
        
        } catch (err) { next(err) }
    }

    static async addItemToWishlist(req, res, next) {
      const item = req.body;
      const { idProduct } = req.params;

      try {
        const product = await CategoriesServices.getDataOneProduct(idProduct);
        const variantId = CartServices.discoveringVariantIt(item, product)     
        const items = WishlistServices.wishlistItem(idProduct, variantId, '1')
        await WishlistServices.sendDataWishlist(items, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }

    static async deleteItemFromWishlist(req, res, next) {
      const variantId = req.body.variantId;

      try {
        const wishlist = await WishlistServices.getDataWishlist(req.cookies.token);
        const wishlistProducts = wishlist.data.items
        const wishlistProductId = CartServices.checkIfVariantIdMatch(wishlistProducts, variantId);  
        const itemToBeDeleted = WishlistServices.deleteWishlistItem(wishlistProductId[0], variantId)
        await WishlistServices.deleteDataWishlist(itemToBeDeleted, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }

    static async changeQuantityOfItemFromWishlist(req, res, next) {
      const variantId = req.params.idVariant;
      const quantity = req.body.quantityProduct;

      try {
        const wishlist = await WishlistServices.getDataWishlist(req.cookies.token);
        const wishlistProducts = CartServices.returnItemsFromRequest(wishlist);
        const wishlistProductId = CartServices.checkIfVariantIdMatch(wishlistProducts, variantId);  
        const itemToBeChanged = WishlistServices.wishlistItem(wishlistProductId[0], variantId, quantity)
        await WishlistServices.changeQuantityWishlist(itemToBeChanged, req.cookies.token);

        res.redirect('/wishlist')
      
      } catch (err) { next(err) }
    }


}
   
module.exports = WishlistController;
