const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



const urlcloud = 'mongodb+srv://dquan2k3:1111@cluster0.rutjh.mongodb.net/accounts?retryWrites=true&w=majority&appName=Cluster0';
const url = 'mongodb://localhost:27017/doanNNKB';

const connectDB = async () => {
    try {
      await mongoose.connect(url);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1);
    }
};

module.exports = connectDB;
