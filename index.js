const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConnection');
const cors = require('cors');
const defaultRoutes = require('./routes/defaultRoutes');
const userRoutes = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

//connect and check db connection
dbConnect();

//routes
app.get('/', (req, res)=>{
    res.redirect('home');
});
app.use('/', defaultRoutes);
app.use('/user', userRoutes);


//check port connection
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`server is now running in port:${port}`);
});