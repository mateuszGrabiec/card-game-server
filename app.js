/**
 * This is file with controler which defines rounting and websockets 
 * @require
 */
const {Controller} = require('./controller.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

console.log('\n\n\n');
dotenv.config();
console.log(process.env.MONGO_ADDRESS);
console.log(process.env.MONGO_PW);

mongoose.connect('mongodb://admin:'+process.env.MONGO_PW+'@'+process.env.MONGO_ADDRESS+'/card-game',{ useNewUrlParser: true, useUnifiedTopology:true },err=>{
    console.log(err);
});


const server = new Controller();

const { PORT = 3000 } = process.env;
 
server.listen(PORT);