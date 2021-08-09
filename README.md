# Realtime Transaction Generator

##### Tech-stack:
- Server: nodejs
- Client: javascript
- Database: MySQL

##### Reason for using web-sockets:
- Bi-directional
- Extensible
- multiple conncurrent connections

Steps to execute:
1) clone this repo
2) need mysql server locally
3) install nodejs
4) execute `npm install` to install dependencies.
5) create the db `nodemysql`
	- you can also use `http://localhost:80/createdb` by commenting the `database : 'nodemysql'` statement in connection section. Revert it after creating the db.)
6) create the table using `http://localhost:80/createtable`
7) run `node app.js`
8) connect to server at `http://localhost:80/`

Areas of improvements:
1) Currently it is displaying the transactions from the time the client is connected.
   We can read the database and display few old transactions along with newly generated.
2) The search is happening but it is delayed. Need to study the usage of sockets more.
