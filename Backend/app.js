const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes.js');
const captainRoutes = require('./routes/captain.routes.js');
const cookieParser = require('cookie-parser');



connectToDB();




//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use("/users",userRoutes);
app.use("/captains",captainRoutes);




module.exports = app;