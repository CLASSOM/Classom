var http = require('http');
var fs = require('fs');

var app = http.createServer(function (request, response) {
    var url = request.url;
    if (request.url == '/') {
        url = '/test.html'; // 메인 html 페이지
    }
    else{
        response.writeHead(404);
        response.end();
        return;
    }
    
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));

});
app.listen(3000);