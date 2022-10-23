const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config({ path: 'config.env' });



const app = express();



const PORT = process.env.PORT || 8080;

//log request
app.use(morgan('tiny'));


//parse request to body parser
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//load routes
app.use('/', require('./server/routes/index'));


//load assets
app.use('/css', express.static(path.resolve(__dirname, "public/css")));
app.use('/img', express.static(path.resolve(__dirname, "public/img")));
app.use('/js', express.static(path.resolve(__dirname, "public/scripts")));

app.get('/', (req, res) => {
    res.render('index');
})


app.listen(PORT, () => { console.log('Server is running on http://localhost:' + PORT + '/') }); 