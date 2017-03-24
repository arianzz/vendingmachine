


var http = require('http')
var cheerio = require('cheerio')
var GPIO = require('onoff').Gpio,
    led = new GPIO(18, 'out'),
    button = new GPIO(16, 'in', 'both');

    });

})


http.createServer(function(req, res) {
    // sending a response header of 200 OK
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    // print out Hello World
    res.send('Hello World\n');
    // use port 8080
    res.end();

}).listen(8080);

console.log('Server running on port 8080.');

var photos = ["vendingmachine/1.png", "vendingmachine/2.png", "vendingmachine/3.png", "vendingmachine/4.png", "vendingmachine/5.png" ];
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
    } else {
        // turn LED off
        var randNum = Math.floor(Math.random()*photos.length)
        console.log("random number: ",randNum);
        show(photos[randNum]);
        led.writeSync(0);
        console.log('im not working');
    }
}

// pass the callback function to the
// as the first argument to watch()
button.watch(light);

//images.innerHTML = photos[randNum];

function photoTrigger() {
    images.innerHTML = photos[myIndex];
    myIndex = (myIndex + 1) % (photos.length);
}
console.log('im triggering a photo');
//}
