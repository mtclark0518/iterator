const db = require('../models')
const DB = db.models;

let number = 
    {
        number: 0,
    }

DB.User.findAll({ 
    where: {
        isActive: true
    }}).then(users=>{
        console.log(users)
    })

const constructo = () => {
    return DB.Container.create(number)
};

constructo().then( () => { process.exit() } )