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

    console.log('New User Connected...');
});



app.use(express.static(publicPath));

server.listen(port, console.log(`Server is up on port ${port}`));