/**
 * This is package d web application framework for Node.js, released as free and open-source software under the MIT License.  
 */
const express = require('express');
/**
 * Socket.IO is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.   
 */
const socketIO = require('socket.io');
/**
 * This is package allow to handling http requests
 */
const http = require('http');
/**
 * This is package with table and putting cards logic
 */
const Table = require('./services/tableService');

const bodyParser = require('body-parser');

const userService = require('./services/userService');

class Controller {

    /**
    * Represents a server
    * @constructor
    * @param {Object} app - The app
    * @param {Object} httpServer - The server
    * @param {Object} io - The io
    * @param {method} handleRoutes - This handling routes to endpoint ie. hello world
    * @param {method} handleSocketConnection - This method handling reauest through websocket
    * @param {Class} Table - This is Class which handling puting card
    */
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


    /** Method initalazing API listeners @memberof Controller */
    handleRoutes() {
        /**
        * Index listener senging hello world
        * @memberof Controller
        * @name get/
        * @function
        * @inner
        * @param {string} path - Express path
        * @param {callback} middleware - Middleware sending Hello World.
        * @param {Object} req - Reqest from client
        * @param {Object} res - Response to client -> 'Hello world!!'
        */
        this.app.get("/",function(req, res){
            res.send('Hello world!!');
        });

        this.app.post("/user",function(req, res){
            // console.log(req.body);
            userService.createUser(req.body);
            res.send(req.body);
        });
    }

    /** This method handling websockets */
    handleSocketConnection() {
        /**
        * Callback of this expression is setting listeners to Websocket function
        * @memberof Controller
        * @name on.Connetion
        * @function
        * @inner
        */
        this.io.on("connection", socket => {

            /**
            * Socket handler sending Table
            * @memberof Controller
            * @name getTable
            * @function
            * @inner
            * @param {string} name - getTable
            * @param {callback} middleware - Middleware sending table with state
            * @returns Table with actual state
            */
            socket.on("getTable",()=>{
                this.io.emit("sendTable",this.table.table)
            })

            /**
            * Socket handler putting card and sending table
            * @memberof Controller
            * @name put
            * @function
            * @inner
            * @param {string} name - put
            * @param {callback} clientData - Middleware putting card (clientData)
            * @returns Updated table
            */
            socket.on("put", clientData => {
                this.table.putCard(clientData);
                socket.emit("sendTable",this.table);
            });
        });
    }

    listen(PORT) {
        this.httpServer.listen(PORT,()=>console.log('Server is listening on http://localhost:'+PORT));
    }
}

module.exports = {
    Controller
}
