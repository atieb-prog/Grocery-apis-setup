import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';

import basketRouter from './routes/basketRouter.js';
import createBasketTable from './data/createBasketTable.js';
import createTable from './data/createColumn.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

createBasketTable();
createTable();

app.use('/api',basketRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/checkdb", async (req, res) => {
    const client = await pool.connect();
    const result = await client.query("SELECT current_database()");
    res.json({ database: result.rows[0] });
    client.release();
});

