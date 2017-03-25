var express = require('express')
var app = express()
var server = require('http').Server(app);
var cheerio = require('cheerio')
var GPIO = require('onoff').Gpio,
    led = new GPIO(18, 'out'),
    button = new GPIO(16, 'in', 'both');

    // });

app.use(express.static('public'));

var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("frontend has connected")

  client.on('art', function(data){
  });

  client.on('disconnect', function(){
	console.log("frontend has disconnected")
  });

});

var photos = ["vendingmachine/1.png", "vendingmachine/2.png", "vendingmachine/3.png", "vendingmachine/4.png", "vendingmachine/5.png"];
myIndex = 1;
//var images = document.getElementById("images");
let $ = cheerio.load('<div id="images"></div>')
var images = $("#images");
// define the callback function
function show(photo) {
 // the code to display the photo
 console.log("show method");
 console.log(photo);
}

function light(err, state) {

    // check the state of the button
    // 1 == pressed, 0 == not pressed
    if (state == 1) {
        // show(photos[0]);
        console.log('im working');
        photoTrigger()
        led.writeSync(1);
        console.log('whatever');
	var randNum = Math.floor(Math.random()*photos.length)
        io.emit('message','vendingmachine/'+randNum+'.png')
    } else {
        // turn LED off
        var randNum = Math.floor(Math.random()*photos.length)
        console.log("random number: ",randNum);
        show(photos[randNum]);
        led.writeSync(0);
        console.log('im not working');
    }
}
app.get('/', function (req, res) {
	console.log('server');
	//res.send('<h1>Hellosdfa world</h1><script src = "socket.io/socket.io.js"> </script><script> var socket = io(); </script>');
	res.sendFile(__dirname + '/index.html');
  //res.sendFile('public/index.html', {root: __dirname});
})
// pass the callback function to the
// as the first argument to watch()
button.watch(light);

//images.innerHTML = photos[randNum];

function photoTrigger() {
    images.innerHTML = photos[myIndex];
    myIndex = (myIndex + 1) % (photos.length);
}
//console.log('im triggering a photo');
//}
server.listen(8080);
