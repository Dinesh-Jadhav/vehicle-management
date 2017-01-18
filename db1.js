var mySQL = require('mysql');
var pool = mySQL.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b7e9655bc5bc80',
    password: 'fae4c042',
    database: 'heroku_673a3fa0823b544',
    migrate: 'safe',
    connectionLimit: 10,
});

module.exports = pool;
console.log(pool);
