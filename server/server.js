const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text))
    });

    console.log('New User Connected...');
});



app.use(express.static(publicPath));

server.listen(port, console.log(`Server is up on port ${port}`));