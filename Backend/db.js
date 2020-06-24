var sql = require('mysql');

const db = sql.createConnection({
    host: "localhost",
    user: "root", 
    password: "1234qwer", // you should change this.
    database: "cardDB"
});

db.connect();

var dictBenefit = {};

db.query('SELECT * from annual', function (err, rows, fields){
    if (err) {
        throw err;
    }

    for (var i in rows){
        dictBenefit[rows[i].카드명] = -rows[i].연회비;
        console.log(rows[i].카드명 + ' ' + dictBenefit[rows[i].카드명]);
    }
});

