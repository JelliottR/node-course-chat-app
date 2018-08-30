const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {

    socket.on('disconnect', (reason) => {
        console.log('Client disconnected...', reason);
    });

    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the chat app!",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New user joined...",
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    console.log('New User Connected...');
});



app.use(express.static(publicPath));

server.listen(port, console.log(`Server is up on port ${port}`));