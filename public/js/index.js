const socket = io();

socket.on('connect', function () {
    console.log('Connected to server...');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message...', message);
    jQuery('#messages').append(`<li>${message.from}: ${message.text}</li>`);
});

socket.on('newLocationMessage', function (message) {
    jQuery('#messages').append(`<li>${message.from}: <a href="${message.url}" target="_blank">My current location</a></li>`);
});

jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   socket.emit('createMessage', {
       from: "User",
       text: jQuery('#message-form [name=message]').val()
   }, function (){

   });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Your browser does not support Geolocation.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location.');
    })
});