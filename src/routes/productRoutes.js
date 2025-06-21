const express = require('express')
const router = express.Router()

const {getProducts} = require('../controllers/productsController');
const {getProductById} = require('../controllers/productsController');
const {createProduct} = require('../controllers/productsController');
const {deleteProduct} = require('../controllers/productsController');
const {updateProduct} = require('../controllers/productsController');
const {getAllProductTypes} = require('../controllers/productsController');

router.get('/types', getAllProductTypes);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router
