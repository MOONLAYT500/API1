express crud api for todo list with database
entry point - app.js
starting process:
npm init to get all needed node.modules
you need to create "config" directory at root of your project. Insiede you need to create to files - .env and config.js

.env exampe:
HOST = yourlocalhost or etc
BASE_PORT = your custon port to run(3000)
USERNAME = username
PASSWORD = password
DB_NAME = dbname

.config example:
require('dotenv').config({ path: `${__dirname}/.env` })

    module.exports = {
    mainUri: 'yuor main api uri',
    basePort: process.env.BASE_PORT || 3000,
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
    database: process.env.DB_NAME || 'dbname',
    host: process.env.HOST || 'localhost',
    dialect: 'your db dialect',

}

then: 
  1. go to /api directory 
  2. open your terminal: 
  3. set command: node app.js (for nodemon users: nodemon app.js)

if you need to do migrations: 
  1. go to /api directory 
  2. open your terminal 
  3. set command: npx sequelize migration:create 
  4. go to: migrations/yourmigration.js 
  5. add changes to ypur model from model/yourdbmodel.js
  6.open your terminal 
  7. set command: npx sequelize-cli db:migrate

to undo to previous migration: 
  1. go to /api directory 
  2. open your terminal 
  3. set command: npx sequelize migration:create 
  4. npx sequelize db:migrate:undo
