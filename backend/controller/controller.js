const db = require('../models')
const User = db.models.User;


const login = (req, res) => {

    let username = req.body.name;
    let attemptedPassword = req.body.password;
    const findOrCreateUser = (name) => {
        console.log(name);
        User.findOne({ 
            where: {
                name: name 
            }})
            .then(user => {
                if (user) {
                    console.log('user found')
                    validateUser(user, attemptedPassword)
                } else {
                    console.log('no user found')
                    createUser(username, attemptedPassword)
                }
            });
    };
    const validateUser = (user, password) => {
        let encrypted = user.dataValues.password
        if (user.validPassword(password, encrypted)) {
            console.log('it worked');
            user.updateAttributes({
                active: true
            })
            .then(user=>{
                res.json(user)
            })
        } else { 
            console.log('error damnit');
            res.json("an error occured")
        }
    };
    const createUser = (user, password) => {
        User.create({
            name: user,
            password: password,
            ExampleId: 1
        })
        .then( user => {
            let pass = user.dataValues.password
            let hashed = user.hash(pass)
            user.updateAttributes({
                password: hashed,
                active: true
            })
            .then( user => { 
                console.log(user.dataValues)
                res.json(user)
            })
        })
    }


    findOrCreateUser(username)

};
// const logout = (req, res) => {
//     let username = req.body.username
//     User.findOne({ where: {
//         name: username
//     }}).then(user=>{
//         if (!user) { res.json('ERROR') }
//         user.updateAttributes({
//             isActive: false
//         })})
//         .then(user => {
//         res.json(user)
//     });
// };


module.exports = { 
    login: login,
    // logout: logout
};