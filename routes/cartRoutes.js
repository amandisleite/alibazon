const { Router } = require('express');
const CartController = require('../controllers/CartController');
const auth = require('../middlewares/ensureAuthenticated');

const router = Router();

router.use(auth.ensureAuthenticated)
router.get('/cart', CartController.getCart);
router.post('/cart/:idProduct', CartController.addItemToCart);
router.post('/cart/delete', CartController.deleteItemFromCart);

module.exports = router;