// controllers/categoryController.js
import Category from "../models/Category.js";

// ➕ Add category
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // duplicate check
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add category" });
  }
};

// 📂 Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// ✏️ Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

// 🗑️ Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
