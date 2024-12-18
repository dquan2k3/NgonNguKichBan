import express from 'express';
import * as OrderController from "../controller/order"

const router = express.Router();

router.post('/loadOrder', OrderController.loadOrder) 
router.post('/done', OrderController.done) 
  


export default router;
