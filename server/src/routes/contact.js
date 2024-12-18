import express from 'express';
import * as contactController from "../controller/contact"

const router = express.Router();

router.post('/contact', contactController.upContact);
router.post('/loadContact', contactController.loadContact) 
router.post('/readContact', contactController.readContact)
  


export default router;
