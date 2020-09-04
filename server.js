
//Server and socket setup
const express = require('express');
const app = express();
app.use(require('cors')());
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 4000;

//Database
const connectDb = require("./database/connection");
const User = require('./database/User.model')

//Password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

io.on('connection', socket => {
    console.log('User connected!');
    socket.on('imageSubmit', data => {
        io.sockets.emit('imagePost', data);
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

connectDb().then(() => {
    console.log("MongoDb connected");
})

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server connected")
})

//Test code for signin endpoint
/* app.post('/signin', (req, res) => {
    if (req.body.username === db.users[0].username &&
        req.body.password === db.users[0].password){
            res.json('success');
        } else {
            res.status(400).json('error logging in')
        }
}) */

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        const user = new User({username: username, password: hash})
        await user.save().then(() => console.log(user));
        res.json(user.username);
    })
})

//Test code for MongoDB
/* app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
app.get("/user-create", async (req, res) => {
    const user = new User({ username: "userTest" });
    await user.save().then(() => console.log("User created"));
    res.send("User created \n");
}); */