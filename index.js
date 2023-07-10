const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const socket = require('socket.io')
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 4000
const mongoose = require("mongoose");
// const {registerUsers } = require('./controllers/signUpController');
const router = require('./routers');
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/asset'));
app.use(express.json());
app.use(cors());
app.use('/', router)
app.set('strictQuery', false);
dotenv.config();
mongoose.connect(process.env.URI).then(res =>{
      console.log('Mongoose Db Connected');
}).catch(err =>{
      console.log("Mongoose connection failed");
      console.log(err);
})

// router.post('/register', registerUsers)


const serverIo = server.listen(PORT, (req, res) => {
      console.log(`Server is listening at https://localhost:${PORT}`)
});

const io = socket(serverIo, {
      cors:{
            origin:"*",
            Credential:true
      }
})

global.onlineUers = new Map();
io.on('connection', (socket) => {
      global.chatsocket = socket;
      socket.on("addUser", (id) => {
            onlineUers.set(id, socket.id);
      });
      socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUers.get(data.to);
            if(sendUserSocket){
                  socket.to(sendUserSocket).emit("msg-receive", data.message);
            }
      })
})