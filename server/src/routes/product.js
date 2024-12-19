import express from 'express'
const router = express.Router()
import multer from 'multer'
import * as ProductController from '../controller/product'


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/loadProduct', ProductController.loadProduct);
router.post('/loadProductDetail', upload.none(), ProductController.loadProductdetail);
router.post('/loadRandomProduct', ProductController.loadRandomProduct);
router.post('/addProduct', upload.single('file'), ProductController.addProduct);
router.post('/deleteProduct', ProductController.deleteProduct);
router.post('/alterProduct', upload.single('file'), ProductController.alterProduct);
router.post('/renderSaleProduct', ProductController.renderSaleProduct);
router.post('/renderHotProduct', ProductController.renderHotProduct);
router.post('/rate', ProductController.rate)
router.post('/loadrate', ProductController.loadRate)
router.post('/addwish', ProductController.wish)
router.post('/checkwish', ProductController.checkWish)
router.post('/loadwish', ProductController.loadWish)
router.post('/loadproductbywish', ProductController.loadProductByWish)

export default router