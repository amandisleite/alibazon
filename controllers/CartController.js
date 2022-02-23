const { CartServices, CategoriesServices, WishlistServices } = require('../services');

class CartController {
    
    static async getCart(req, res, next) {
        try {
          const cart = await CartServices.getDataCart(req.cookies.token);

          const cartProducts = CartServices.returnItemsFromRequest(cart);
          const cartProductsId = CartServices.getProductsIds(cartProducts);
          const cartVariantsId = CartServices.getVariantsIds(cartProducts);
          const productsQuantities = CartServices.getQuantities(cartProducts);
          const productsPrices = CartServices.getPrices(cartProducts);
          const colorProducts = CartServices.getColorOfProducts(cartProducts);
          
          const productList = await CartServices.getProductsByProductsIds(cartProductsId);
          const imagesLinks = CartServices.checkIfVariantImageExists(cartVariantsId, productList, colorProducts);
          const totalPrice = CartServices.totalPrice(productsPrices);

          res.render('cart', {
            productList,
            productsQuantities,
            totalPrice,
            cartVariantsId,
            imagesLinks
          })
        
        } catch (err) { next(err) }
    }

    static async addItemToCart(req, res, next) {
      const item = req.body;
      const { idProduct } = req.params;
      
      try {
        const product = await CategoriesServices.getDataOneProduct(idProduct);
        const variantId = CartServices.discoveringVariantIt(item, product)

        if (req.headers.referer.includes('wishlist')) {
          await WishlistServices.sendItemToCartAndDeleteFromWishlist(idProduct, item.variantId, req.cookies.token)
        }
        
        let items = 0;
        if (item.quantityProduct) {
          items = CartServices.cartItem(idProduct, variantId, item.quantityProduct)
        } else {
          items = CartServices.cartItem(idProduct, variantId, '1')
        }
        await CartServices.sendDataCart(items, req.cookies.token);

        res.redirect('/cart')
      
      } catch (err) { next(err) }
    }

    static async deleteItemFromCart(req, res, next) {
      const variantId = req.body.variantId;
      let cartProductId = [];

      try {
        const cart = await CartServices.getDataCart(req.cookies.token);
        const cartProducts = CartServices.returnItemsFromRequest(cart);
        const cartProductId = CartServices.checkIfVariantIdMatch(cartProducts, variantId);
        const itemToBeDeleted = CartServices.deleteCartItem(cartProductId[0], variantId)
        await CartServices.deleteDataCart(itemToBeDeleted, req.cookies.token);

        res.redirect('/cart')
      
      } catch (err) { next(err) }
    }

    static async changeQuantityOfItemFromCart(req, res, next) {
      const variantId = req.params.idVariant;
      const quantity = req.body.quantity;

      try {
        const cart = await CartServices.getDataCart(req.cookies.token);
        const cartProducts = CartServices.returnItemsFromRequest(cart);
        const cartProductId = CartServices.checkIfVariantIdMatch(cartProducts, variantId);
        const itemToBeChanged = CartServices.cartItem(cartProductId[0], variantId, quantity)
        await CartServices.changeQuantityCart(itemToBeChanged, req.cookies.token);

        res.redirect('/cart')
      
      } catch (err) { next(err) }
    }


}
   
module.exports = CartController;
