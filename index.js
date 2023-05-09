const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 4000
const mongoose = require("mongoose");
const {registerUsers } = require('./controllers/signUpController');
const router = require('./routers');
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + 'assets'));
app.use(express.json());
app.use(cors());
app.use('/', router)
app.set('strictQuery', false);
dotenv.config();
mongoose.connect(process.env.URI).then(res =>{
      console.log('Mongoose Db Connected');
}).catch(err =>{
      console.log(err);
})

// router.post('/register', registerUsers)


server.listen(PORT, (req, res) => {
      console.log(`Server is listening at https://localhost:${PORT}`)
})