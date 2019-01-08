let http = require('http');
var fs = require('fs');
let urlParse = require('url');
const {
    parse
} = require('querystring');

http.createServer(function (request, response) {
    var filepath = [];
    filepath = './index.html';
    filepath2 = './mainpage.html';
    filepath3 = './accessdenied.html';

    const {
        method,url
    } = request; 

    console.log(url, method); 

    let q = urlParse.parse(url, true).query; 
    let pathName = urlParse.parse(url, true).pathname; 

    if (pathName === '/') 
    {
        fs.readFile(filepath, function (error, content) { 
            if(error) {
                console.log('Something went wrong with '+filepath);
                response.end('Something went wrong with '+filepath);
            }
            else {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(content, 'utf-8');
            }
        });
    }else if(pathName === '/login'){
        console.log('We got post');
        
        if (request.method === 'POST') {
            
            var body = '';
            // var Username;
            // var pword;

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
             let items = parse(body);
             console.log(items);
             // Username = body['username'];
             // pword = body['password'];
             // console.log(body);
             // console.log(Username+" "+pword);
           
            // authentication
            if(items.username == "admin" && items.pword == "pass"){
                var filepath2 = './mainpage.html';
                fs.readFile(filepath2, function (error, content) {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.end(content, 'utf-8');
                });
            }else{
                var filepath3 = './accessdenied.html';

                fs.readFile(filepath3, function (error, content) { 
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.end(content, 'utf-8');
                });
            }
        });
        }
    }
}).listen(8000);