require('dotenv').config();
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || process.env.PORT_LOCAL;

// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo! masuk 2')
// })
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});


http.listen(port, () => { 
    console.log(process.env)
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});