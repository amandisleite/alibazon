const { Router } = require('express');
const OrderController = require('../controllers/OrderController');
const auth = require('../middlewares/ensureAuthenticated');

const router = Router();

router.use(auth.ensureAuthenticated)
router.get('/orders', OrderController.getOrder);
router.post('/orders', OrderController.createOrder);

module.exports = router;