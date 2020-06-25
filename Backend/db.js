var sql = require('mysql');

/* db 서버 연결 */
const config = sql.createConnection({
    host: "localhost",
    user: "root", 
    password: "1234qwer", // you should change this.
    database: "cardDB"
});

config.connect();

/* DB에서 할인율 가져와서 베스트 카드 계산 */
function find_best(res, callback){
    var total = res['total'];    
    var dictBenefit = {};

    // 연회비
    config.query('SELECT * from annual', function (err, rows, fields){
        if (err) {throw err;}

        for (var i in rows){
            dictBenefit[rows[i].카드명] = -rows[i].annual_fee;
        }
    });

    config.query('SELECT * from movie', function(err, rows, fields){
        if(err) {throw err;}

        var cost = res['movie'] * 10000;
        var mBenefit = {};

        for(var i in rows){
            if(rows[i].prev_month > total) continue;

            var plus = rows[i].benefit;
            var limit = rows[i].month_limit;
            var card = rows[i].카드명;

            if(plus < 1){ // 백분율
                plus *= cost;
            }
            if(limit > 0 && plus > limit){ //적립 한도 안넘게
                plus = limit;
            }

            if(mBenefit[card] === undefined || mBenefit[card] < plus){
                mBenefit[card] = plus;
            }
        }

        for(var i in rows){
            var card = rows[i].카드명;
            if(mBenefit[card] === undefined) continue;
            dictBenefit[card] += mBenefit[card];
            mBenefit[card] = 0;
        }
    });

    //대형마트
    config.query('SELECT * from mart', function (err, rows, fields) {
        if (err) { throw err; }

        var cost = res['mart'];
        var mBenefit = {};

        for (var i in rows) {
            if (rows[i].prev_month > total) continue;

            var plus = rows[i].benefit;
            var limit = rows[i].month_limit;
            var card = rows[i].카드명;

            if (plus < 1) { // 백분율
                plus *= cost;
            }
            if (limit > 0 && plus > limit) { //적립 한도 안넘게
                plus = limit;
            }

            if (mBenefit[card] === undefined || mBenefit[card] < plus) {
                mBenefit[card] = plus;
            }
        }

        for (var i in rows) {
            var card = rows[i].카드명;
            if (mBenefit[card] === undefined) continue;
            dictBenefit[card] += mBenefit[card];
            mBenefit[card] = 0;
        }
    });


    //편의점
    config.query('SELECT * from conv', function (err, rows, fields) {
        if (err) { throw err; }

        var cost = res['conv'];
        var mBenefit = {};

        for (var i in rows) {
            if (rows[i].prev_month > total) continue;

            var plus = rows[i].benefit;
            var limit = rows[i].month_limit;
            var card = rows[i].카드명;

            if (plus < 1) { // 백분율
                plus *= cost;
            }
            if (limit > 0 && plus > limit) { //적립 한도 안넘게
                plus = limit;
            }

            if (mBenefit[card] === undefined || mBenefit[card] < plus) {
                mBenefit[card] = plus;
            }
        }

        for (var i in rows) {
            var card = rows[i].카드명;
            if (mBenefit[card] === undefined) continue;
            dictBenefit[card] += mBenefit[card];
            mBenefit[card] = 0;
        }
    });


    //핸드폰 요금
    config.query('SELECT * from phone', function (err, rows, fields) {
        if (err) { throw err; }

        var cost = res['ph'];
        var cate = res['ph_cate'];
        var mBenefit = {};

        if(cate === 'nope') return;

        for (var i in rows) {
            if (rows[i].prev_month > total) continue;

            if(cate === 'SKT') var plus = rows[i].SKT;
            else if(cate === 'KT') var plus = rows[i].KT;
            else var plus = rows[i].LG;
 
            var limit = rows[i].limit;
            var card = rows[i].카드명;

            if (plus < 1) { // 백분율
                plus *= cost;
            }
            if (limit > 0 && plus > limit) { //적립 한도 안넘게
                plus = limit;
            }

            if (mBenefit[card] === undefined || mBenefit[card] < plus) {
                mBenefit[card] = plus;
            }
        }

        for (var i in rows) {
            var card = rows[i].카드명;
            if (mBenefit[card] === undefined) continue;
            dictBenefit[card] += mBenefit[card];
            mBenefit[card] = 0;
        }
    });

    //외식,카페
    config.query('SELECT * from food', function (err, rows, fields) {
        if (err) { throw err; }

        var c_cost = res['cafe'];
        var b_cost = res['bakery'];
        var d_cost = res['delivery'];
        var mBenefit = {};

        for (var i in rows) {
            if (rows[i].prev_month > total) continue;

            var plus = rows[i].coffee;
            var limit = rows[i].month_limit;
            var card = rows[i].카드명;

            if (plus < 1) { // 백분율
                plus *= c_cost ;
                plus += b_cost * rows[i].bakery;
                plus += d_cost * rows[i].delivery;
            }
            else plus += rows[i].bakery + rows[i].delivery;
            
            if (limit > 0 && plus > limit) { //적립 한도 안넘게
                plus = limit;
            }

            if (mBenefit[card] === undefined || mBenefit[card] < plus) {
                mBenefit[card] = plus;
            }
        }

        for (var i in rows) {
            var card = rows[i].카드명;
            if (mBenefit[card] === undefined) continue;
            dictBenefit[card] += mBenefit[card];
            mBenefit[card] = 0;
        }
    });   
    

    // 교통
    config.query('SELECT * from transport', function (err, rows, fields) {
        if (err) { throw err; }

        var cost = res['transport'];
        var mBenefit = {};

        for (var i in rows) {
            if (rows[i].prev_month > total) continue;

            var plus = rows[i].benefit;
            var limit = rows[i].month_limit;
            var card = rows[i].카드명;

            if (plus < 1) { // 백분율
                plus *= cost;
            }
            if (limit > 0 && plus > limit) { //적립 한도 안넘게
                plus = limit;
            }

            if (mBenefit[card] === undefined || mBenefit[card] < plus) {
                mBenefit[card] = plus;
            }
        }

        for (var i in rows) {
            var card = rows[i].카드명;
            if (mBenefit[card] === undefined) continue;
            dictBenefit[card] += mBenefit[card];
            mBenefit[card] = 0;
        }
    });

    //최종 결과 뽑기

    var best_card_link = "";
    var best_benefit = -10000000;
    var best_card = "신한 Deep Dream 카드";

    config.query('SELECT * from links', function(err,rows,fields){
        if(err) {throw err;}

        for(var i in rows){
            var card = rows[i].카드명;
            if(dictBenefit[card] > best_benefit){
                best_benefit = dictBenefit[card];
                best_card_link = rows[i].링크;
                best_card = card;
            }
        }
    });

    callback(best_card_link);
}
module.exports = find_best;


