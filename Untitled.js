var express = require('express')
var app = express()
var server = require('http').Server(app);
var cheerio = require('cheerio')
var GPIO = require('onoff').Gpio,
    led = new GPIO(18, 'out'),
    button = new GPIO(16, 'in', 'both');

    // });


var io = require('socket.io')(server);

io.on('connection', function(client){
  console.log("frontend has connected")

  client.on('art', function(data){
  });

  client.on('disconnect', function(){
  });

});

var photos = ["vendingmachine/1.png", "vendingmachine/2.png", "vendingmachine/3.png", "vendingmachine/4.png", "vendingmachine/5.png", "vendingmachine/6.png", "vendingmachine/7.png", "vendingmachine/8.png", "vendingmachine/9.png", "vendingmachine/10.png", "vendingmachine/11.png", "vendingmachine/12.png", "vendingmachine/13.png", "vendingmachine/14.png", "vendingmachine/15.png", "vendingmachine/16.png", "vendingmachine/17.png", "vendingmachine/18.png", "vendingmachine/19.png", "vendingmachine/20.png", "vendingmachine/21.png", "vendingmachine/22.png", "vendingmachine/23.png", "vendingmachine/24.png", "vendingmachine/25.png", "vendingmachine/26.png"];
myIndex = 1;
//var images = document.getElementById("images");
let $ = cheerio.load('<div id="images"></div>')
var images = $("images");
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
        // console.log('im working');
        photoTrigger()
        led.writeSync(1);
        io.emit('fun','vendingmachine/1.png')
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
  res.send('hi')
})
// pass the callback function to the
// as the first argument to watch()
button.watch(light);

//images.innerHTML = photos[randNum];

app.use('/', app)
function photoTrigger() {
    images.innerHTML = photos[myIndex];
    myIndex = (myIndex + 1) % (photos.length);
}
console.log('im triggering a photo');
//}
server.listen(8080);
