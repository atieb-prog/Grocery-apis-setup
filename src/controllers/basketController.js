import {
  addItemService,
  updateItemQuantityService,
  removeItemService,
  getBasketItemsService,
} from "../models/basketService.js";

const addItem = async (req, res) => {
  try {
    const newItem = await addItemService(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({
      error: "Failed to add item",
      details: error.message,
    });
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const updatedItem = await updateItemQuantityService(
      req.params.id,
      req.body.quantity
    );

    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to update item quantity",
      details: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  try {
    const deletedItem = await removeItemService(req.params.id);
    if (deletedItem) {
      res.status(200).json(deletedItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to remove item",
      details: error.message,
    });
  }
};

const getBasketItems = async (req, res) => {
  try {
    const items = await getBasketItemsService();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch basket items",
      details: error.message,
    });
  }
};

export { addItem, updateItemQuantity, removeItem, getBasketItems };