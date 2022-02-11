require('dotenv').config();

// local
// module.exports = {
//     mainUri: '/api',
//     basePort: process.env.BASE_PORT || 8080,
//     username: process.env.USERNAME || '',
//     password: process.env.PASSWORD || '',
//     database: process.env.DB_NAME || 'postgres',
//     host: process.env.HOST || 'localhost',
//     dialect: 'postgres',
//     token_key: process.env.TOKEN_KEY,
// };

// heroku
module.exports = {
    mainUri: '/api',
    basePort: process.env.PORT || 4000,
    username: process.env.USERNAME_H || '',
    password: process.env.PASSWORD_H || '',
    database: process.env.DB_NAME_H || 'postgres',
    host: process.env.HOST_H || 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    token_key: process.env.TOKEN_KEY,
};
