var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const faker = require('faker');
const mysql = require('mysql');
var moment = require('moment');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root123',
    database : 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});


// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE orders(id INT AUTO_INCREMENT, transaction_id INT, user VARCHAR(255), merchant VARCHAR(255), created_at DATETIME, amount REAL, currency VARCHAR(20), product_id INT, quantity INT, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('table created...');
    });
});

// Generate the orders and send to client
io.on('connection', function(socket) {
	var interval = setInterval(function(){
		const random_id = faker.datatype;
		const name = faker.name;
		const finance = faker.finance;
		const commerce = faker.commerce;
		const curr_time = moment.utc().toDate();

		let sql = 'INSERT INTO orders SET ?';
		let data = {
			"transaction_id": random_id.number(),
			"user": name.firstName(),
			"merchant": name.firstName(),
			"created_at": curr_time,
			"amount": finance.amount(),
			"currency": finance.currencyCode(),
			"product_id": random_id.number(),
			"quantity": random_id.number()
		};

		io.emit('orders', data);

		let query = db.query(sql, data, (err, result) => {
			if(err) throw err;
		});

	}, 60);

    //socket.on("disconnect", (connection) => {
	//	clearInterval(interval);
	//});
});
io.on('connection', function(socket) {
	socket.on('fetch_transaction', function(data) {
		console.log("transaction ID: ", data.id)
		let sql = `SELECT * FROM orders WHERE transaction_id = ${data.id}`;
		let query = db.query(sql, (err, result) => {
			if(err) throw err;
			//console.log(result[0].user);
			socket.emit('transaction', result[0])
		});
	})
})

server.listen(80);