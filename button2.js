var http = require('http')
var GPIO = require('onoff').Gpio,
    led = new GPIO(18, 'out'),
    button = new GPIO(16, 'in', 'both');

http.createServer(function(req, res) {
    // sending a response header of 200 OK
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    // print out Hello World
    res.send('Hello World\n');
    // use port 8080

}).listen(8080);
console.log('Server running on port 8080.');
var photos = ["vendingmachine/1.png", "vendingmachine/2.png", "vendingmachine/3.png", "vendingmachine/4.png", "vendingmachine/5.png", "vendingmachine/6.png", "vendingmachine/7.png", "vendingmachine/8.png", "vendingmachine/9.png", "vendingmachine/10.png", "vendingmachine/11.png", "vendingmachine/12.png", "vendingmachine/13.png", "vendingmachine/14.png", "vendingmachine/15.png", "vendingmachine/16.png", "vendingmachine/17.png", "vendingmachine/18.png", "vendingmachine/19.png", "vendingmachine/20.png", "vendingmachine/21.png", "vendingmachine/22.png", "vendingmachine/23.png", "vendingmachine/24.png", "vendingmachine/25.png", "vendingmachine/26.png"];
myIndex = 1;
var images = document.getElementById('#images');
// define the callback function
function light(err, state) {

    // check the state of the button
    // 1 == pressed, 0 == not pressed
    if (state == 1) {
        show(photos[i]);
        // console.log('im working');
        photoTrigger()
        led.writeSync(1);
    } else {
        // turn LED off
        led.writeSync(0);
        console.log('im not working');
    }
}

// pass the callback function to the
// as the first argument to watch()
button.watch(light);

images.innerHTML = photos[0];

function photoTrigger() {
    images.innerHTML = photos[myIndex];
    myIndex = (myIndex + 1) % (photos.length);
}
console.log('im triggering a photo');
//}
