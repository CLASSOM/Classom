var sql = require('mysql');

/* db 서버 연결 */
const config = sql.createConnection({
    host: "localhost",
    user: "root", 
    password: "1234qwer", // you should change this.
    database: "cardDB"
});

config.connect();

function find_best(res){
    /* DB에서 할인율 가져와서 베스트 카드 계산 */
    var dictBenefit = {};

    // 연회비
    config.query('SELECT * from annual', function (err, rows, fields){
        if (err) {throw err;}

        for (var i in rows){
            dictBenefit[rows[i].카드명] = -rows[i].annual_fee;
            console.log(dictBenefit[rows[i].카드명]);
        }
    });
}
module.exports = find_best;


