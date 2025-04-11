const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'train',
  password: 'prath',
  port: 5432,
});

app.get('/seats', async (req, res) => {
  const result = await pool.query('SELECT * FROM seats ORDER BY id ASC');
  res.json(result.rows);
});

app.post('/book', async (req, res) => {
  const { seats } = req.body;
  for (let id of seats) {
    await pool.query('UPDATE seats SET is_reserved = TRUE WHERE id = $1', [id]);
  }
  res.sendStatus(200);
});

app.post('/reset', async (req, res) => {
  await pool.query('UPDATE seats SET is_reserved = FALSE');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
