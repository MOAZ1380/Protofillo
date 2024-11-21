const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()  
const path = require('path');

const user_router = require('./routes/users_route');
const post_router = require('./routes/posts_route');

const http_status = require('./utils/http_status');




const app = express();
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const url = process.env.URL;
mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

app.use('/api/users', user_router);
app.use('/api/posts', post_router);

app.all('*', (req, res, next) => {       
    res.json({status : http_status.ERROR, message : 'this resource is not available'});
});




app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});