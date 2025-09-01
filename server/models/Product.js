import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    barcode: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    category: { type: String, required: true }, 
    expiryDate: { type: Date },
    brand: { type: String },
    description: { type: String },
    reorderLevel: { type: Number, default: 5 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
