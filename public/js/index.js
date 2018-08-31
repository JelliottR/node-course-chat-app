const socket = io();

socket.on('connect', function () {
    console.log('Connected to server...');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    jQuery('#messages').append(`<li>${message.from} ${formattedTime}: ${message.text}</li>`);
});

socket.on('newLocationMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    jQuery('#messages').append(`<li>${message.from} ${formattedTime}: <a href="${message.url}" target="_blank">My current location</a></li>`);
});

jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   const messageTextBox = jQuery('#message-form [name=message]');

   socket.emit('createMessage', {
       from: "User",
       text: messageTextBox.val()
   }, function (){
       messageTextBox.val('');
   });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Your browser does not support Geolocation.');
    }

    locationButton.prop( "disabled", true );
    document.getElementById("send-location").innerText  = "Waiting ...";

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
            locationButton.prop( "disabled", false );
            document.getElementById("send-location").innerText  = "Send Location";

        })
    }, function () {
        alert('Unable to fetch location.');
    })
});