var sql = require('mysql');

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234qwer",
    database: "CardDB"
});

db.connect();

db.query('SELECT * from cardname', function (err, rows, fields){
    if (err) {
        throw err;
    }
    console.log(rows);
});