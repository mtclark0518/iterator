const db = require('../models')
const DB = db.models;

let number = 
    {
        number: 0,
        activeUsers: 0
    }



const constructo = () => {
    return DB.container.create(number)
};

constructo().then( () => { process.exit() } )