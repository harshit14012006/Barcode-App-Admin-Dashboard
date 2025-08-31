// routes/categoryRoutes.js
import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", addCategory);        // ➕ Add category
router.get("/", getCategories);       // 📂 Get all categories
router.put("/:id", updateCategory);   // ✏️ Update category
router.delete("/:id", deleteCategory); // 🗑️ Delete category

export default router;
