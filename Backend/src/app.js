const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/user.routes');
const musicRoutes = require('./routes/music.routes');
const cors = require("cors");


const app = express();


app.use(express.json());

app.use(
  cors({
    origin: "https://beatly-l-6jfx.vercel.app",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/music',musicRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Beatly backend is running successfully'
  });
});



module.exports = app;

