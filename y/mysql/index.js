var mysql = require('mysql');
var config = {
    port: '3306',
    user: 'root',
    password: 'root',
    database: '1609a',
    connectionLimit: 100
}

var pool = mysql.createPool(config);
module.exports = function(sql, query, fn) {
    fn = fn ? fn : query;
    query = query || [];

    function connectionCallback(err, con) {
        if (err) {
            fn(err);
        } else {
            con.query(sql, query, function(err, results) {
                con.release();
                queryCallback(err, results)
            })
        }
    }

    function queryCallback(err, results) {
        if (err) {
            fn(err);
        } else {
            fn(null, results)
        }
    }
    pool.getConnection(connectionCallback)
}