const express = require('express');
const router = express.Router();

module.exports = (pool) => {
 router.get('/',async (req, res) =>{
  try{
   const [rows] = await pool.execute('SELECT id, nombre, email FROM clientes');
   res.json(rows);
  } catch (err) {
	   res.status(500).json({ error: 'Error consultando clientes'});
  }
 });
 return router;
};
