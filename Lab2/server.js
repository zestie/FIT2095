var http = require('http');
var fs = require('fs');
let fileName = 'index.html';
http.createServer(function (request, response) {
    console.log('request ', request.url);
    var url = request.url;
    console.log('request ', url);

    switch (url) {
        case '/':
            fileName = 'index.html';
            break;
        case '/mainpage':
            fileName = 'mainpage.html';
            break;
        default '/accessdenied':
            fileName = 'accessdenied.html';
            break;
    }
    fs.readFile(fileName, function (error, content) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content, 'utf-8');
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');