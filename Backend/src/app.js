const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/user.routes');
const musicRoutes = require('./routes/music.routes');
const cors = require("cors");


const app = express();


app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/music',musicRoutes);



module.exports = app;

