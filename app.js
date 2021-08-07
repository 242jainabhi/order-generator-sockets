var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const faker = require('faker');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//var numClients = 0;

io.on('connection', function(socket) {
	var interval = setInterval(function(){
		const id = faker.datatype;
		const name = faker.name;
		const finance = faker.finance;
		const commerce = faker.commerce;
		const curr_time = new Date();

        data = {"id": id.number(),
        "user": name.firstName(),
        "merchant": name.firstName(),
        "created_at": curr_time,
        "amount": finance.amount(),
        "currency": finance.currencyCode(),
        "product_id": id.number(),
        "quantity": id.number()}

		//numClients++;
		io.emit('stats', data);

		console.log(id.number());
	}, 60); 


    /*socket.on("disconnect", (connection) => {
		clearInterval(interval);
	});*/
});

server.listen(80);