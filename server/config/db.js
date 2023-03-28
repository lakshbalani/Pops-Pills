const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "laksh",
password: "laksh",
database:"blog_comments" 
})

module.exports = db;