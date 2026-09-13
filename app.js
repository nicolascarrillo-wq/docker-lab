const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.APP_PORT || 9000;

const pool = mysql.createPool({
 host:process.env.DB_HOST,
 user:process.env.MYSQL_USER,
 password:process.env.MYSQL_PASSWORD,
 database:process.env.MYSQL_DATABASE,
 waitForConnections:true,
 connectionLimit:10
});

app.get('/',(req,res) => res.send('App corriendo. Rutas:/clientes,/productos'));
app.use('/clientes',require('./routes/clientes')(pool));
app.use('/productos',require('./routes/productos')(pool));

app.listen(PORT,() => console.log('Servidor escuchando en puerto' + PORT));
