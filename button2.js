var GPIO = require('onoff').Gpio,
    led = new GPIO(18, 'out'),
    button = new GPIO(16, 'in', 'both');

// define the callback function
function light(err, state) {

  // check the state of the button
  // 1 == pressed, 0 == not pressed
  if(state == 1) {
    // turn LED on
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

function photoTrigger(){

  console.log('im triggering a photo');
}
