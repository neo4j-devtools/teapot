var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(request, response){

	var filePath = './public' + request.url;
    if (filePath == './public/')
		filePath = './public/index.html';
		
	console.log("serving ", filePath);

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
        case '.png':
            contentType = 'image/png';
            break;     
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Something unexpectedly bad happened: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
	});
	
});

server.listen(7341);

console.log('Teapot serving tea at: http://localhost:7341');
