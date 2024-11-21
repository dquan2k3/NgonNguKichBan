import express from 'express'
const router = express.Router()
import multer from 'multer'
import * as ProductController from '../controller/product'


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/loadProduct', ProductController.loadProduct);
router.post('/loadProductDetail', upload.none(), ProductController.loadProductdetail);
router.post('/addProduct', upload.single('file'), ProductController.addProduct);
router.post('/deleteProduct', ProductController.deleteProduct);
router.post('/alterProduct', upload.single('file'), ProductController.alterProduct);

export default router