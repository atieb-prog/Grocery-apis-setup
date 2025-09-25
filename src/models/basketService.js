import pool from "../config/db.js";

const addItemService = async (itemData) => {
  const client = await pool.connect();
  try {
    const { item_name, quantity } = itemData;
    const result = await client.query(
      "INSERT INTO basket (item_name, quantity) VALUES ($1, $2) RETURNING *",
      [item_name, quantity]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  } finally {
    client.release();
  }
};

const updateItemQuantityService = async (itemId, quantity) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE basket SET quantity = $2 WHERE id = $1 RETURNING *",
      [itemId, quantity]
    );
    return result.rowCount === 1 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error updating item quantity:", error);
    throw error;
  } finally {
    client.release();
  }
};

const removeItemService = async (itemId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "DELETE FROM basket WHERE id = $1 RETURNING *",
      [itemId]
    );
    return result.rowCount === 1 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error removing item:", error);
    throw error;
  } finally {
    client.release();
  }
};


const getBasketItemsService = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM basket");
    return result.rows;
  } catch (error) {
    console.error("Error fetching basket items:", error);
    throw error;
  } finally {
    client.release();
  }
};

export {
  addItemService,
  updateItemQuantityService,
  removeItemService,
  getBasketItemsService,
};