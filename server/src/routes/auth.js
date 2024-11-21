import express from 'express'
const router = express.Router()
import * as authController from '../controller/auth'

router.post('/register', authController.register);

router.post('/login',  authController.login);

export default router