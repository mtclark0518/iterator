const log = (stuff) => console.log(stuff)
const db = require('../models')

//define our socket iteractions
module.exports = (io) => {
    io.on('connection', (socket) => {
        db.models.container.findOne({
            where: {
                id : 1
            }
        })
        .then(response => {
            let users = parseInt(response.dataValues.activeUsers)      
            log('a user connected');
            users++
            response.updateAttributes({ 
                activeUsers: users 
            })
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
            db.models.container.findOne({
                where: {
                    id : 1 
                }
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
                    socket.broadcast.emit('update users', {
                        users: updatedUsers 
                    });
                });
            });
        });
        socket.on('disconnect', () => {
            db.models.container.findOne({
                where: {
                    id : 1 
                }
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
                    });
                });
            });
        });
    });
};