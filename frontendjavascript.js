$(function photos() {
    var socket = io();
    $('art').submit(function(data) {
        socket.emit('art', 'vendingmachine/1.png');
        return false;
    });
    socket.on('art', function(photos) {
      console.log(photos);
    });
});
