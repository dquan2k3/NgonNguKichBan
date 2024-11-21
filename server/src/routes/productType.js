import express from 'express'
const router = express.Router()
import * as ProductTypeController from '../controller/productType'

router.post('/loadProductType', ProductTypeController.loadProductType);
router.post('/addProductType', ProductTypeController.addProductType);
router.post('/deleteProductType', ProductTypeController.deleteProductType);
router.post('/alterProductType', ProductTypeController.alterProductType);

export default router