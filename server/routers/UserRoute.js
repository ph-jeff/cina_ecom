const express = require('express');
const router = express.Router();

const user = require('../controllers/UserController');
const product = require('../controllers/ProductController');
const brand = require('../controllers/BrandController')
const transaction = require('../controllers/TransactionController');
const cart = require('../controllers/CartController');
const top_up = require('../controllers/TopUpController');
const message = require('../controllers/MessageController');
const order = require('../controllers/UserOrderController');

const { isLogin } = require('../middlewares/userAuth');

router.get('/message', isLogin, message.index);
router.post('/message', isLogin, message.create);

// brands
router.get('/brand', brand.list);

router.get('/product', product.index);
router.get('/product/latest', product.latest);
router.get('/product/sale', product.sale);
router.get('/product/featured', product.featured);
router.get('/product/details/:id', product.view);
router.get('/product/search', product.search);
router.get('/product/category', product.category);
router.get('/product/:brand_name', product.per_brand);
// checkout to payment
router.get('/product/checkout/:id', isLogin, product.checkout);
router.post('/product/checkout/:id', isLogin, product.place_order);

// record a transaction of user either success, cancelled or failed
router.get('/transaction/success/:link', isLogin, transaction.success)
router.get('/transaction/cancelled/:link', isLogin, transaction.cancelled)

router.get('/cart', isLogin, cart.cart);
router.post('/cart/:id', isLogin, cart.addcart);

router.put('/cart/add/:product_id/:item_id', isLogin, cart.add); 
router.put('/cart/sub/:product_id/:item_id', isLogin, cart.sub); 
router.delete('/cart/:product_id/:item_id', isLogin, cart.remove);
router.post('/checkout', isLogin, cart.checkout)

router.get('/account', isLogin, user.account);
router.put('/account', isLogin, user.update);
router.put('/account/change-password', isLogin, user.update_password);

router.get('/transaction', isLogin, order.index);

router.get('/account/balance', isLogin, top_up.balance);
router.post('/account/balance', isLogin, top_up.deposit);
router.get('/account/top-up-records', isLogin, top_up.top_up_records);

router.post('/account/top-up', isLogin, top_up.deposit);

module.exports = router;