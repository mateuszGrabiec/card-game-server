const Controller = require('./controller.js');

const server = new Controller();

const { PORT = 3000 } = process.env;
 
server.listen(PORT);