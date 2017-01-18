var mySQL = require('mysql');
var pool = mySQL.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicle_admin'
});

module.exports = pool;
