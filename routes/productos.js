const express = require('express');
const router = express.Router();

module.exports = (pool) =>{
 router.get('/', async (req, res) =>{
  try{
   const [rows] = await pool.execute('SELECT id, nombre, precio FROM productos');
   res.json(rows);
  }catch (err){
   res.status(500).json({error: 'Error consultando productos'});
  }
 });
 return router;
};
