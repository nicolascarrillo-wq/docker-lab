
const mysql = require('mysql2/promise');

const nombres = ['Ana','Luis','Marco','Sofia','Carlos','Elena','Diego','Paula'];
const productos = ['Teclado','Mouse','Monitor','Laptop','Audifonos','Webcam'];

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomPrecio() { return (Math.random() * 500 + 10).toFixed(2); }

async function seed() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  for (let i = 0; i < 10; i++) {
    const nombre = randomFrom(nombres);
    const email = nombre.toLowerCase() + i + '@correo.com';
    await pool.execute('INSERT INTO clientes (nombre, email) VALUES (?, ?)', [nombre, email]);
  }

  for (let i = 0; i < 10; i++) {
    const nombre = randomFrom(productos) + ' ' + i;
    const precio = randomPrecio();
    await pool.execute('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio]);
  }

  console.log('Registros aleatorios insertados.');
  process.exit(0);
}

seed();
