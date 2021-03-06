var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var db = require('./db.js');
const find_best = require('./db.js');

var app = http.createServer(function (request, response){

    var url = request.url;
    if (request.url === '/' || request.url === '/mainIndex.html') {
        url = '/../FrontEnd/mainindex.html'; // 메인 html 페이지
    
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + url));
    }
    else if(request.url === '/mycard.html'){
        url = '/../Frontend/mycard.html'; // 소비패턴 조사 페이지
        
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname+url));
    }

    else if(request.url === '/submit'){ // test code
        var body = '';

        request.on('data',function(data){
            body = body + data;
        });
        
        request.on('end',function(){
            var post = qs.parse(body);

            if(Object.keys(post).length != 10){
                response.writeHead(404);
                response.end('Please check all the items.');
                return;
            }
            
            find_best(post, function(url){
                response.writeHead(200);
                response.end(`<head><meta charset="utf-8"></head><center><a href="${url}" style={text-align:center;}>여기</a>를 눌러 확인해보세요!`);
            });            
        });
        
    }
    else{
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);

