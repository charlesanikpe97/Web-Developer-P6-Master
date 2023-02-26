require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('Connected to HotTakesDB!'))

const usersSchema = mongoose.Schema({
     email: { type: String, required: true, unique:true },
     password : { type: String, required: true}
})

usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', usersSchema);