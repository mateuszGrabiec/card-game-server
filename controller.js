const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const Table = require('./table');

module.exports = class Controller {

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = socketIO(this.httpServer);
        this.speakerList = [];
        this.handleRoutes();
        this.handleSocketConnection();
        this.table=new Table();
    }


    handleRoutes() {
        this.app.get("/", (req, res) => {
            res.send('Hello world!!');
        });
    }

    handleSocketConnection() {
        this.io.on("connection", socket => {

            socket.on("getTable",()=>{
                this.io.emit("sendTable",this.table.table)
            })

            socket.on("put", clientData => {
                this.table.putCard(clientData)
                //console.log(clientData)
                socket.emit("sendTable",this.table)
            });
        });
    }

    listen(PORT) {
        this.httpServer.listen(PORT,()=>console.log('Server is listening on http://localhost:'+PORT));
    }
}
