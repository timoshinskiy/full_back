const {Router} = require('express');
const router = new Router();
const controller = require('../controllers/productsController.js');

router.get('/catalog',controller.getProducts)
router.put('/edit',controller.editProduct)
router.put('/remove',controller.removeProduct)
router.post('/add',controller.addProduct)
router.get('/product/:id',controller.getProduct)
router.put('/product/order',controller.orderProduct)
router.put('/product/unorder',controller.unOrderProduct);
router.get('/basket/:email',controller.getBasket);
router.get('/admin/:username',controller.getAdminProducts)


module.exports = router