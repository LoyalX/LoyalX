const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const morgan = require('morgan');
const methodOverride = require('method-override')

const fs = require('fs');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

app.get('/apps', (req, res) => {
    fs.readdir(__dirname + '/public', (err, files) => res.json(files));
});

app.post('/users', (req, res, next) => {
    console.log("api post called");
    res.json(req.body);
    return next;
});


app.use(express.static(__dirname + '/public')); //This is the place for your static stuff

app.listen(8888, () => {
    console.log('server is listening on port 8888!');
})