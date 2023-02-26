//MongoDB Connection = mongodb+srv://charlesanikpe:Acmilan_97@cluster0.4c7zufe.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const app = express();
const User = require('./models/users.model');
const userRoute = require('./routes/user.route');


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/auth', userRoute);


module.exports = app;