
const express = require('express');
const app = express();
app.use(require('cors')());
const server = require('http').Server(app);
const io = require('socket.io')(server);

//register
//signin

const PORT = process.env.PORT || 4000;

const db = {
    users: [
        {
            username: 'test',
            password: '1234',
        }
    ]
}

io.on('connection', socket => {
    console.log('User connected!');
    socket.on('imageSubmit', data => {
        io.sockets.emit('imagePost', data);
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.use(express.json());

app.get('/', (req, res) => {
    res.send(db.users)
})

app.post('/signin', (req, res) => {
    if (req.body.username === db.users[0].username &&
        req.body.password === db.users[0].password){
            res.json('success');
        } else {
            res.status(400).json('error logging in')
        }
})

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    db.users.push({
        username: username,
        password: password
    });
    res.json(db.users[db.users.length-1]);
})