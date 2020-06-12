var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var app = http.createServer(function (request, response) {
    var url = request.url;
    if (request.url === '/') {
        url = '/test.html'; // 메인 html 페이지
    
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + url));
    }
    else if(request.url === '/submit'){
        var body = '';

        request.on('data',function(data){
            body = body + data;
        });
        
        request.on('end',function(){
            var post = qs.parse(body);
            response.writeHead(200);
            response.end(post.month_consumption);
        });
        
    }
    else{
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);