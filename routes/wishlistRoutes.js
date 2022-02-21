const { Router } = require('express');
const WishlistController = require('../controllers/WishlistController');

const router = Router();

router.get('/wishlist', WishlistController.getWishlist);
router.post('/wishlist/addItem/:idProduct', WishlistController.addItemToWishlist);
router.post('/wishlist/delete', WishlistController.deleteItemFromWishlist);
router.post('/wishlist/changeQuantity/:idVariant', WishlistController.changeQuantityOfItemFromWishlist);

module.exports = router;