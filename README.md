# The Iterator-ater  

### View live demo [here](https://iterator.herokuapp.com)  
---  
### Build Stack  

#### Client Side  
  * node.js  
  * socket.io  
  * express.js  
  * sequelize.js  
  * bcrypt-node.js  
  * postgresql  
#### Server Side  
  * react.js  
  * axios  
  * socket.io-client  

### Features  
* User login with salt/hash validation  
* RESTful API with express server side routing && axios client side routing   
* Web proxy sends all http requests through single express server
* Postgres relational data modelling  
* React container && presentation components  
* Socket.io realtime events across the stack:
  * db updates broadcast to active users  
  * ui events saved to db && broadcast through socket  
  * socket.io-client built into a scaleable react component   

### Methods use following cli:  
* npm  
* create-react-app
* psql

### How to run locally  
* in terminal run command $ psql  
* connect locally to postgres  
* run cmnd: # CREATE DATABASE { yourDatabaseName };
* run cmnd: \quit;
* cd into working directory
* git clone repository into a directory  
* cd into iterator && open in text-editor  
* from iterator directory touch local.env.js
  * edit && this: module.exports = localDB = 'postgres://{yourmachine}@localhost:5432/{yourDatabaseName}';  
  * add local.env.js to .gitignore  
* return to terminal. from iterator directory run npm install then npm start
* open another terminal window  
* cd into client directory  
* run npm install
* run npm build
* run npm start


### Summaraized step through  
### References  


