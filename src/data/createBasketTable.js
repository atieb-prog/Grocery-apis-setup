import pool from "../config/db.js";

const createBasketTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS basket (
      id SERIAL PRIMARY KEY,
      item_name VARCHAR(100) NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const client = await pool.connect();

  try {
    await client.query(query);
    console.log("Basket table created successfully");
  } catch (error) {
    console.error("Error creating basket table:", error);
    throw error;
  } finally {
    client.release();
  }
};

export default createBasketTable;