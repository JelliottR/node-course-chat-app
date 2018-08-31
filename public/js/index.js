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

jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   socket.emit('createMessage', {
       from: "User",
       text: jQuery('#message-form [name=message]').val()
   }, function (){

   });
});