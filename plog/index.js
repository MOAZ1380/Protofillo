const express = require('express');
const mongoose = require('mongoose');
const user_router = require('./routes/users_route');
require('dotenv').config()  
const path = require('path');
const http_status = require('./utils/http_status');



const app = express();
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const url = process.env.URL;
mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

app.use('/api/user', user_router);

app.all('*', (req, res, next) => {       
    res.json({status : http_status.ERROR, message : 'this resource is not available'});
});





app.use('/api/user', user_router);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});