import express from 'express'
import multer from 'multer'
const router = express.Router()
import * as settingController from '../controller/setting'

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadBanner', upload.single('file'), settingController.uploadBanner);
router.post('/loadBanner', settingController.loadBanner);
router.post('/uploadBannershop', upload.single('file'), settingController.uploadBannershop);
router.post('/loadBannershop', settingController.loadBannershop);
router.post('/uploadBannerhome', upload.single('file'), settingController.uploadBannerhome);
router.post('/loadBannerhome', settingController.loadBannerhome);
router.post('/deleteBannerhome', settingController.deleteBannerhome);
router.post('/alterBannerhome', upload.single('file'), settingController.alterBannerhome);

export default router