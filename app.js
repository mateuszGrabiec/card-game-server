const {Controller} = require('./controller.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.NODE);

const connetionString = process.env.NODE==='PROD' ? 
	'mongodb'+process.env.MONGO_PRE+'://'+process.env.MONGO_USER+':'+process.env.MONGO_PW+'@'+process.env.MONGO_ADDRESS+'/'+process.env.MONGO_DBNAME+process.env.MONGO_PARAMS : 
	'mongodb://'+process.env.MONGO_USER+':'+process.env.MONGO_PW+'@'+process.env.MONGO_ADDRESS+'/'+process.env.MONGO_DBNAME;

mongoose.connect(connetionString,{ useNewUrlParser: true, useUnifiedTopology:true },err=>{
	console.log(err);
});


const server = new Controller();

const { PORT = 3000 } = process.env;
 
server.listen(PORT);