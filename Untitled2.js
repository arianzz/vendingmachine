// Managing the root route
if (path == '/') {
    index = fs.readFile(__dirname+'/public/index.html',
        function(error,data) {

            if (error) {
                res.writeHead(500);
                return res.end("Error: unable to load index.html");
            }

            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        });
// Managing the route for the javascript files
} else if( /\.(js)$/.test(path) ) {
    index = fs.readFile(__dirname+'/public'+path,
        function(error,data) {

            if (error) {
                res.writeHead(500);
                return res.end("Error: unable to load " + path);
            }

            res.writeHead(200,{'Content-Type': 'text/plain'});
            res.end(data);
        });
} else {
    res.writeHead(404);
    res.end("Error: 404 - File not found.");
}

}

let cheerio = require('cheerio')
let $ = cheerio.load('<h2 class="title">Hello world</h2>')

$('h2.title').text('Hello there!')
$('h2').addClass('welcome')

$.html()
