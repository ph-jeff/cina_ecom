const express = require('express');
const router = express.Router();

const path = require('path');
const multer  = require('multer')
const Storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({
    storage: Storage,
});

const { isAdminLogin } = require('../middlewares/userAuth');

const admin = require('../controllers/AdminController')

const product = require('../controllers/ProductController')
const transaction = require('../controllers/TransactionController')
const brand = require('../controllers/BrandController')
const category = require('../controllers/CategoryController')
const size = require('../controllers/SizeController')

const order = require('../controllers/OrderController')

router.get('/dashboard', isAdminLogin, (req, res) => {
    res.send('dashboard');
})

// products
router.get('/product', isAdminLogin, product.index);
router.post('/product', isAdminLogin, upload.single('image'), product.create);
router.delete('/product/:id', isAdminLogin, product.delete);
router.get('/product/update/:id', isAdminLogin, product.get_update);
router.put('/product/update/:id', isAdminLogin, upload.single('image'), product.update);
router.get('/product/search', product.search);

// brands
router.get('/brand', isAdminLogin, brand.view);
router.post('/brand', isAdminLogin, upload.single('image'), brand.create);
router.post('/brand/:id', isAdminLogin, upload.single('image'), brand.update);

// category
router.get('/category', isAdminLogin, category.view);
router.post('/category', isAdminLogin, category.create);
router.post('/category/:id', isAdminLogin, category.update);

// size
router.get('/size', isAdminLogin, size.view);
router.post('/size', isAdminLogin, size.create);
router.post('/size/:id', isAdminLogin, size.update);

// users
router.get('/users', isAdminLogin, admin.user)

// orders
router.get('/order', isAdminLogin, order.pending)
router.get('/order/prepairing', isAdminLogin, order.prepairing)
router.get('/order/to-ship', isAdminLogin, order.to_ship)
router.get('/order/completed', isAdminLogin, order.completed)

router.get('/transactions', isAdminLogin, transaction.index)

module.exports = router;