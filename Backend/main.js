var http = require('http');
var fs = require('fs');
var qs = require('querystring');


var app = http.createServer(function (request, response){

    var url = request.url;
    if (request.url === '/' || request.url === '/mainIndex.html') {
        url = '/../web/html/mainindex.html'; // 메인 html 페이지
    
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + url));
    }
    else if(request.url === '/mycard.html'){
        url = '/../web/html/mycard.html'; // 소비패턴 조사 페이지
        
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname+url));
    }
    else if(request.url === '/samsung.html'){
        url = '/../web/html/samsung.html';

        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + url));
    }

    else if(request.url === '/send'){ // test code
        var body = '';

        request.on('data',function(data){
            body = body + data;
        });
        
        request.on('end',function(){
            var post = qs.parse(body);
            response.writeHead(200);
            response.end(post);
        });
        
    }
    else{
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);

