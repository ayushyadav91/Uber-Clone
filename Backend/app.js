//dotenv file
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');

//Importing Other Files, Models, Routes, etc.
const connectToDB = require('./db/db');
const cookieParser = require('cookie-parser');

//Connecting to DB 
connectToDB();




//Build in middlewares
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json({limit: '15kb'}));
app.use(express.urlencoded({extended:true},{limit: '15kb'}));
// app.use(express.static('public'));

//cookie parser middleware is used to parse cookies
app.use(cookieParser());

//Route to check the health of the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Routes configured and imported
const userRoutes = require('./routes/user.routes.js');
const captainRoutes = require('./routes/captain.routes.js');

app.use("/users",userRoutes);
app.use("/captains",captainRoutes);




module.exports = app;