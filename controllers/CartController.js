const { CartServices, CategoriesServices } = require('../services');

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
            const productNames = await CartServices.getProductsNames(cartProductsId);
            const allColors = CartServices.getVariantColorInfo(productList, cartVariantsId)
            const allSizes = CartServices.getVariantSizeInfo(productList, cartVariantsId)
            const allWidths = CartServices.getVariantWidthInfo(productList, cartVariantsId)
            const imagesLinks = CartServices.checkIfVariantImageExists(cartVariantsId, productList, colorProducts);
            const totalPrice = CartServices.totalPrice(productsPrices);

            res.render('cart', {
                productList,
                productsQuantities,
                totalPrice,
                cartVariantsId,
                imagesLinks,
                allColors,
                allSizes,
                allWidths,
                productNames
            })
        
        } catch (err) { next(err) }
    }

    static async addItemToCart(req, res, next) {
        const item = req.body;
        const { idProduct } = req.params;
        try {
            const product = await CategoriesServices.getDataOneProduct(idProduct);
            const variantId = CartServices.discoveringVariantIt(item, product)
            await CartServices.checkIfRequestComesFromWishlist(req.headers.referer, idProduct, item.variantId, req.cookies.token)
            const quantity = CartServices.checkQuantityOfProduct(item)
            const items = CartServices.cartItem(idProduct, variantId, quantity)
            const addItem = await CartServices.sendDataCart(items, req.cookies.token);
            CartServices.checkIfItemAlreadyChosen(addItem)
            res.redirect('/cart')

        } catch (err) { next(err) }
    }

    static async deleteItemFromCart(req, res, next) {
        const variantId = req.body.variantId;

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
