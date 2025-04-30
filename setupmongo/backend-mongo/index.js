const express = require('express')
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = 3000
app.use(bodyParser.json())


app.listen(PORT,()=>{
    console.log("Server Started On Port 3000");
});

connectDB();


app.use(cors());

app.use(router);
