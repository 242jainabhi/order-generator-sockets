var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const faker = require('faker');
const mysql = require('mysql');

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
    let sql = 'CREATE TABLE orders(id INT AUTO_INCREMENT, user VARCHAR(255), merchant VARCHAR(255), created_at DATETIME, amount REAL, currency VARCHAR(20), product_id INT, quantity INT, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.send('table created...');
    });
});

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