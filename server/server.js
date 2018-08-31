const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected...', reason);
    });

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app!"));

    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined..."));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.')
        }

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords, callback) => {
        io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude))
        callback();
    });

    console.log('New User Connected...');
});



app.use(express.static(publicPath));

server.listen(port, console.log(`Server is up on port ${port}`));