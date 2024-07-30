const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Setup the express app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files in the public directory
app.use(express.static('public'));

// Socket.io connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming chat messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
