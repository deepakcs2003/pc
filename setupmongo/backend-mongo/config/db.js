const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/'; // Database name: 

const connectDB = async()=>{
    mongoose.connect(mongoURI, {
      })
      .then(() => {
        console.log('Connected to MongoDB successfully!');
      })
      .catch(err => {
        console.error('MongoDB connection failed:', err);
      });
}


module.exports = connectDB;
