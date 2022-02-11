require('dotenv').config();

// local
// module.exports = {
//     mainUri: '/api',
//     basePort: process.env.PORT || 8080,
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
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'postgres',
    host: process.env.HOST || 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    token_key: process.env.TOKEN_KEY,
};
