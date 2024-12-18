import express from 'express';
import authRouter from './auth'
import productTypeRouter from './productType'
import productRouter from './product'
import settingRouter from './setting'
import connectDB from '../config/connectDatabase';
import cartRouter from './cart'
import contactRouter from './contact'
import orderRouter from './order'
const router = express.Router()

const initRoutes = (app) => {
    connectDB();
    
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }))
    

    app.use('/api', authRouter)
    app.use('/api', productTypeRouter)
    app.use('/api', productRouter)
    app.use('/api', settingRouter)
    app.use("/api", cartRouter);
    app.use("/api", contactRouter);
    app.use("/api", orderRouter)
    
    app.use("/gett", (req, res) =>{
        res.send(req.session)
    })
    

    return app.use('/', (req, res) => {
        res.send('server onn...')
    })


}

export default initRoutes