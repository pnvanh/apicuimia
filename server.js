//Define Dependences
const http = require('http');
const app =require('./app');
const socket = require('socket.io');
//Define PORT
const socketEvent = require('./app/socketIO/index');
const port = process.env.PORT || 6969;

//Creat server
const server = http.createServer(app);
const io = socket(server);
io.origins("*:*");

// io.on('connection',function(socket){
//    console.log(socket.id);
//    console.log("User connect");
//    socket.on("token", function(data) {
//       //console.log({data})
//       socketEvent.chat(data);
//    })
// });
socketEvent.chat(io);

//Listen a port
server.listen(port, "127.0.0.1");