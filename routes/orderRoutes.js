const { Router } = require('express');
const OrderController = require('../controllers/OrderController');

const router = Router();

router.get('/orders', OrderController.getOrder);
router.post('/orders', OrderController.createOrder);

module.exports = router;