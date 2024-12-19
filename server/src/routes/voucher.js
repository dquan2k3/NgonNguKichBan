import express from 'express'
const router = express.Router()
import * as VoucherController from '../controller/voucher'

router.post('/addvoucher', VoucherController.addvoucher);
router.post('/loadvoucher', VoucherController.loadvoucher);
router.post('/altervoucher', VoucherController.altervoucher);
router.post('/deletevoucher', VoucherController.deletevoucher);



export default router