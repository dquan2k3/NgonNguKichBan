import express from 'express';
import * as CartController from '../controller/cart';

const router = express.Router();

router.get('/getcart', CartController.getCart); 
router.post('/addcart', CartController.addToCart); 
router.delete('/removecart/:id', CartController.removeFromCart);
router.post('/cod', CartController.cod);  
router.put('/update/:id', CartController.updateCartItem);
router.get('/testtt', CartController.testtt)


export default router;
