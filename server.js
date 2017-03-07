// requiring the HTTP interfaces in node

/*
to copy these files from your laptop to the pi, open terminal, navigate to your desktop folder,
then type: scp -r Node_pi_test/ pi@128.122.6.239:/home/pi/Desktop/Node_pi_test
*/

var gpio = require('rpi-gpio');
var http = require('http'); // create an http server to handle requests and response

http.createServer(function (req, res) {
 // sending a response header of 200 OK
res.writeHead(200, {'Content-Type': 'text/plain'});
 // print out Hello World
res.end('Hello World\n');
 // use port 8080

}).listen(8080);
console.log('Server running on port 8080.');

//Read more at https://www.pluralsight.com/guides/node-js/hello-world-node-js?status=i$
gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});

gpio.setup(18, gpio.DIR_IN, gpio.EDGE_BOTH);
// gpio.setup(18, gpio.DIR_IN, readInput);

// function readInput() {
//     gpio.read(18, function(err, value) {
//         console.log('The value is ' + value);
//     });
// }
