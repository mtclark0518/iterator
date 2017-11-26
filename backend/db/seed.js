const db = require('../models')
const DB = db.models;

let number = 
    {
        number: 0,
        activeUsers: 0
    }

DB.user.findAll({ 
    where: {
        isActive: true
    }}).then(users=>{
        console.log(users)
    })

const constructo = () => {
    return DB.container.create(number)
};

constructo().then( () => { process.exit() } )