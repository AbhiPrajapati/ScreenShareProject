const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../client')));
app.use('/viewer', express.static(path.join(__dirname, '../viewer')));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Relay signaling messages between peers
    socket.on('signal', (data) => {
        io.emit('signal', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
