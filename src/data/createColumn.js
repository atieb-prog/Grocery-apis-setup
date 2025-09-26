// src/data/createCoulmn.js
import pool from "../config/db.js";

const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS basket (
      id SERIAL PRIMARY KEY,
      item_name VARCHAR(100) NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const addColumnQuery = `
    ALTER TABLE basket
    ADD COLUMN IF NOT EXISTS is_bought BOOLEAN NOT NULL DEFAULT FALSE;
  `;

  const client = await pool.connect();

  try {
    // Create table if not exists
    await client.query(createTableQuery);

    // Add the new column if it doesn't exist
    await client.query(addColumnQuery);

    console.log("Basket table created/updated successfully");
  } catch (error) {
    console.error("Error creating/updating basket table:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

export default createTable;

