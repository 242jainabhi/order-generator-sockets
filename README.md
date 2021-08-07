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
4) execute `npm install`
5) create the db `nodemysql`
	- you can also use `http://localhost:80/createdb` by commenting the `database : 'nodemysql'` statement in connection section. Revert it after creating the db.)
	- create the table using `http://localhost:80/createtable`
6) run `node app.js`
7) connect to server at `http://localhost:80/`
