const { Router } = require('express');
const WishlistController = require('../controllers/WishlistController');

const router = Router();

router.get('/wishlist', WishlistController.getCart);
router.post('/wishlist/addItem/:idProduct', WishlistController.addItemToCart);
router.post('/wishlist/delete', WishlistController.deleteItemFromCart);
router.post('/wishlist/changeQuantity/:idVariant', WishlistController.changeQuantityOfItemFromCart);

module.exports = router;