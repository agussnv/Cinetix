const express = require('express');
const cors = require('cors');

const app = express();
const port = 29001;

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.get("/", (req, res) => {
    res.send("Hello World ");
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('newTicket', (ticket) => {
        console.log(ticket);

        io.to(ticket.imdbID).emit('newTicket', ticket);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('joinRoom', (imdb) => {
        socket.leaveAll();
        socket.join(imdb);
        console.log("ROOMS: ", socket.rooms);
        console.log(`User joined room: ${imdb}`);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});