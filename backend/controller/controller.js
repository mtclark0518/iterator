const db = require('../models')
const User = db.models.user;

const login = (req, res) => {

    let username = req.body.name;
    let attemptedPassword = req.body.password;

    const findUser = (name) => {
        console.log(name);
        User.findOne( { where: { name: name } } ).then(user => {
            if (user) {
                console.log('user found')
                validateUser(user, attemptedPassword)
                
            } else {
                console.log('no user found')
                createUser(username, attemptedPassword)
            }
        })
    }
    const validateUser = (user, password) => {
        console.log(user, password)
        let encrypted = user.dataValues.password
        console.log(encrypted)
        if (user.validPassword(password, encrypted)) {
            console.log('it worked')
            res.json(user)
        } else { 
            console.log('error damnit');
            res.json(
                "an error occured"
            )
        }
    }
    const createUser = (user, password) => {
        console.log(user, password)
        User.create({
            name: user,
            password: password
        })
        .then( user => {
            let pass = user.dataValues.password
            console.log(pass)
            let hashed = user.hash(pass)
            user.updateAttributes({
                password: hashed
            })
            .then( user => { 
                console.log(user.dataValues)
                res.json(user)
            })
        })
    }

    findUser(username)


    // console.log(req)
    // User.create( { name: req.body.name, password: req.body.password } )
    // .then( user => {
    //     if(error){return console.log(error, 'error')}else{
    //     // let encrypted = user.dataValues.password;
    //     // let attempted = req.body.password;
    //     // if (user.validPassword(attempted, encrypted)) {
    //     res.json(user);}
    //     //     console.log(user);
    //     // } else {
    //     //     return console.log(error, ': error');
    //     // }
    // });
};
// const activeUsers = (req, res) => {
//     User.findAll({
//         where: {
//             isActive: true
//         }
//     }).then()
// }
const test = (req, res) => {
    
    console.log(req.body)
    User.findOrCreate({
        where: {
            name: req.body.name, 
            password: req.body.password 
        }
    })
    .then( (user) => {
        console.log(user) 
        res.json(user);
        
    })
}

module.exports = { 
    login: login,
    test: test
};