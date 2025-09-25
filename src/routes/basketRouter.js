import express from "express";
import {
  addItem,
  updateItemQuantity,
  removeItem,
  getBasketItems,
} from "../controllers/basketController.js";

const router = express.Router();


router.post("/basket/items", addItem);
router.patch("/basket/items/:id", updateItemQuantity);
router.delete("/basket/items/:id", removeItem);
router.get("/basket/items", getBasketItems);

export default router;