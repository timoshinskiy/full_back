const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fullstack',
    password: '1055820',
    port: '5432',
});
module.exports = pool;