const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

//utility function for laziness
const log = (stuff) => console.log(stuff)

//for passing form data
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

//backend routing and views
const routes = require('./backend/config/routes')
const path = require('path')
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//used to connect to heroku postgres 
const {Client} = require('pg')
const client = new Client({ 
  connectionString: process.env.DATABASE_URL,
  ssl: true 
  })
  .connect((err) => {
    if (err) { 
      log('error yo: ', err)
    } else { 
      log('connected to db')
    }
  });

//socketio instance
const socketio = require('socket.io')
const io = socketio(server)
//imports module and passes the socketio connection
require('./backend/config/socket')(io)

//connects to the server
const PORT = process.env.PORT || 1979
server.listen(PORT, () => log('Giggity goo on port: ' + PORT));