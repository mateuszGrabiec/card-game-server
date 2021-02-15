const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const Table = require('./services/tableService');

const bodyParser = require('body-parser');

const userService = require('./services/userService');
const cardService = require('./services/cardService');

class Controller {

	constructor() {
		this.app = express();
		this.httpServer = http.createServer(this.app);
		this.app.use( bodyParser.json() );
		this.app.use(bodyParser.urlencoded({
			extended: true
		})); 
		this.io = socketIO(this.httpServer);
		this.handleRoutes();
		this.handleSocketConnection();
		this.table=new Table();
	}

	handleRoutes() {
		this.app.get('/',function(req, res){
			res.send('Hello world!!');
		});

		this.app.post('/user',function(req, res){
			// console.log(req.body);
			userService.createUser(req.body);
			res.send(req.body);
		});
		this.app.get('/card',async function(req, res){
			// console.log(req.body);
			// for(let i=0;i<5;i++){
			// 	await cardService.createCard({
			// 		power:10,
			// 		name:'Example card '+i,
			// 		describe:'Example description '+i,
			// 		image:'https://i.pinimg.com/236x/8b/d7/41/8bd741103d058d908b71fba467e732d3--game-ui-card-games.jpg',
			// 		x:10,
			// 		y:10,
			// 		shield:10,
			// 		onPutTrigger:false,
			// 	});
			// }
			const cards = await cardService.getCards();
			res.send({body:cards});
		});
	}

	handleSocketConnection() {
		this.io.on('connection', (socket) => {

			socket.on('getTable',()=>{
				this.io.emit('sendTable',this.table.table);
			});
            
			socket.on('put', (clientData) => {
				this.table.putCard(clientData);
				socket.emit('sendTable',this.table);
			});
		});
	}

	listen(PORT) {
		this.httpServer.listen(PORT,()=>console.log('Server is listening on http://localhost:'+PORT));
	}
}

module.exports = {
	Controller
};
