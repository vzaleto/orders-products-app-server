const express = require('express')
const router = express.Router()

const {getAllOrders} = require('../controllers/orderController');
const {deleteOrder} = require('../controllers/orderController');

router.get('/', getAllOrders);
router.delete('/:id', deleteOrder);

module.exports = router