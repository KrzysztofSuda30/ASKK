const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'testdb',
  password: 'password',
  port: 5432,
});

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.send(result.rows[0]);
});

app.listen(3000, () => {
  console.log('App is running on port 3000');
});
