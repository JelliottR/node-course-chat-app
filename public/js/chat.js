const socket = io();

function scrollToBottom () {
    //Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');
    //Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if ((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    const params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err){
            alert(err);
            window.location.href = '/';
        }else {
            console.log('No error');
        }
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
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