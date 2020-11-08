/**
 * This is file with controler which defines rounting and websockets 
 * @require
 */
const {Controller} = require('./controller.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:'+process.env.MONGO_PW+'@localhost:27017/card-game',{ useNewUrlParser: true, useUnifiedTopology:true });


const server = new Controller();

const { PORT = 3000 } = process.env;
 
server.listen(PORT);