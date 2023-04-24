//Basic portfolio modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localStrategy = passportlocal.Strategy;
let flash = require('connect-flash');

//setup express session
app.use(
  session({
    secret: 'SomeSecret',
    saveUninitialized: false,
    resave: false,
  })
);

//initialize flash
app.use(flash());

//initialize passport

app.use(passport.initialize());
app.use(passport.session());

//passport user configuration

//create a user model instance
let userModel = require('./server/model/user');
let User = userModel.User;

//implement a user authentication strategy
passport.use(User.createStrategy());

//serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 8080;

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body parser
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs');

//load routes
app.use('/', require('./server/routes/index'));

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'public/css')));
app.use('/img', express.static(path.resolve(__dirname, 'public/img')));
app.use('/js', express.static(path.resolve(__dirname, 'public/scripts')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT + '/');
});
