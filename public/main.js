var socket = io();

const temperatureDisplay = document.getElementById('temperature');

function myFunction(led){              
    socket.connect().emit('led', { value: led });
}

socket.on('temp', function (data) {
	console.log(data)
	temperature.innerHTML = `${data}°C`;
});