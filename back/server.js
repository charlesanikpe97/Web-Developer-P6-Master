require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('Connected to HotTakesDB!'))

app.use(express.json())

const userSignUp = require('./routes/signup')
app.use('/api/auth/signup', userSignUp)

app.listen(3000, () =>{
    console.log('Server is listening on port 3000!')
})