const db = require('../models')
const DB = db.models;

let number = 
    {
        name: 'Iterator',
        number: 0,
    }

// DB.User.findAll({ 
//     where: {
//         active: true
//     }}).then(users=>{
//         console.log(users)
//     })

const constructo = () => {
    return DB.Example.create(number)
};

constructo().then( () => { process.exit() } )