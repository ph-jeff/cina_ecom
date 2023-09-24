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

router.get('/dashboard', isAdminLogin, (req, res) => {
    res.send('dashboard');
})

router.get('/brand', isAdminLogin, brand.view);
router.post('/brand', isAdminLogin, brand.create);
router.post('/brand/:id', isAdminLogin, brand.update);

router.get('/category', isAdminLogin, category.view);
router.post('/category', isAdminLogin, category.create);
router.post('/category/:id', isAdminLogin, category.update);

router.get('/size', isAdminLogin, size.view);
router.post('/size', isAdminLogin, size.create);
router.post('/size/:id', isAdminLogin, size.update);

router.get('/users', isAdminLogin, admin.user)
router.get('/transactions', isAdminLogin, transaction.index)

router.get('/product', isAdminLogin, product.index);
router.post('/product', isAdminLogin, upload.single('image'), product.create);
router.delete('/product/:id', isAdminLogin, product.delete);
router.get('/product/update/:id', isAdminLogin, product.get_update);
router.put('/product/update/:id', isAdminLogin, upload.single('image'), product.update);

router.get('/product/search', product.search);

module.exports = router;