import express from 'express';
require('dotenv').config();
import cors from 'cors';
import initRoutes from './src/routes';
const session = require("express-session");
import RedisStore from 'connect-redis';
import { memoryStorage } from 'multer';

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true, 
    methods: ["POST", "GET", "PUT", "DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: true, 
      cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );


initRoutes(app)


const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`Server is running on the port ${listener.address().port}`);
})