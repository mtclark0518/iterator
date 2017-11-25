const express = require('express')
const http = require('http')
const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 1979



const {Client} = require('pg')
const client = new Client({ connectionString: process.env.DATABASE_URL || 'postgres://TheTDrive@localhost:5432/mischiefmanaged', ssl: true });
client.connect( (err) => {
	if (err) { log('error yo: ', err) } else { log('connected to db') }
});



const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


const path = require('path')
app.use(express.static(path.join(__dirname, 'backend/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/backend/build/index.html'));
});


const routes = require('./backend/config/routes')
app.use('/', routes)
server.listen(PORT, () => log('Shakedown ' + PORT));




const log = (stuff) => console.log(stuff)


const db = require('./backend/models')


const socketio = require('socket.io')
const io = socketio(server)

io.on('connection', (socket) => {
  db.models.container.findOne({
    where: {id : 1}})
    .then(response => {
      let users = parseInt(response.dataValues.activeUsers)      
      log('a user connected');
      users++
      response.updateAttributes({ 
        activeUsers: users })
        .then(response => {
          let updatedUsers = response.dataValues.activeUsers
          io.sockets.emit('update users', {
            users: updatedUsers
          })
          let number = response.dataValues.number
          io.sockets.emit('welcome', {
            number: number,
            name: 'iterator',
          })

        })
    });

  socket.on('iterate', data => {
    let changeBy = parseInt(data)
    db.models.container.findOne({
      where: {id : 1}
    })
    .then( number => {
      let numTo = parseInt(number.dataValues.number);
      changeBy = numTo + changeBy;
      number.updateAttributes({
        number: changeBy
      })
      .then( newNumber => {
        let newNum = newNumber.dataValues.number;
        io.sockets.emit('iterated', newNum)
      });
    });
  });

  socket.on('disconnect', () => {
    db.models.container.findOne({
      where: {id : 1}
    })
    .then(response => {
      let users = response.dataValues.activeUsers
      log('a user dipped')
      users--
      response.updateAttributes({
        activeUsers: users 
      })
      .then(response => {
        let updatedUsers = response.dataValues.activeUsers
        io.sockets.emit('update users', {
          users: updatedUsers 
        })
      })
    });
  });
});

