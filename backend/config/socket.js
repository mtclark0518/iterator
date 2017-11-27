const log = (stuff) => console.log(stuff)
const db = require('../models')
const User = db.models.User
const Example = db.models.Example
//define our socket iteractions
module.exports = (io) => {
    io.on('connection', (socket) => {
        //maybe a listener hear for the front end 
        Example.findOne({
            where: {
                id : 1
            }
        })
        .then( example => {
            let number = example.dataValues.number
            let name = example.dataValues.name
            io.sockets.emit('welcome', {
                number: number,
                name: name,
            });   
        });
        
        socket.on('user joined', data => {
            socket.username = data.username;
            User.findAndCountAll({ 
                where: { 
                    active:true
                }
            }).
            then( result => {
                let activeUsers = result.count;
                io.sockets.emit('update users', {users: activeUsers})
            });
        });
        socket.on('iterate', data => {
            let changeBy = parseInt(data)
            Example.findOne({
                where: { 
                    id : 1
                }
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

        socket.on('logging out', data => {
            socket.disconnect();                
        });
        socket.on('disconnect', () => {
            log(socket.username)
            User.findOne({
                where: {
                    name: socket.username
                }
            })
            .then( user => {
                log(user)
                user.updateAttributes({
                    active:false
                })
                .then( user => { 
                    log('a user dipped')
                    User.findAndCountAll({where:{active:true}}).
                    then( result => {
                        let activeUsers = result.count;
                        socket.broadcast.emit('update users', {users: activeUsers})
                    });                
                });
            });
        });
    })
}