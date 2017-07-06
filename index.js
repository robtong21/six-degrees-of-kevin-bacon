const express = require('express');
const app = express();
const volleyBall = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
// const socketio = require('socket.io');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(volleyBall);

app.use(express.static('public'))

app.set('view engine','html');
app.engine('html', nunjucks.render);
nunjucks.configure('views',{noCache: true});

app.use('/', routes);

let server = app.listen(3000,function(){
    console.log('Trivia\'ing on port 3000!');
});

// let io = socketio.listen(server);

// app.use('/', routes(io));
