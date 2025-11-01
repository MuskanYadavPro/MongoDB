// ============================================
// 📦 E-commerce Catalog with Nested Documents
// Using Node.js + Express + MongoDB (Mongoose)
// ============================================

// Step 1: Import required modules
const express = require("express");
const mongoose = require("mongoose");

// Step 2: Initialize app
const app = express();
app.use(express.json());

// Step 3: Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Connection Error:", err));

// Step 4: Define Schema and Model
const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: String,
  variants: [variantSchema] // Nested structure
});

const Product = mongoose.model("Product", productSchema);

// ============================================
// 📚 Controller Functions
// ============================================

// ➕ Insert Sample Products
app.post("/api/products/insert-samples", async (req, res) => {
  const sampleData = [
    {
      name: "T-Shirt",
      price: 499,
      category: "Clothing",
      variants: [
        { color: "Red", size: "M", stock: 25 },
        { color: "Blue", size: "L", stock: 15 }
      ]
    },
    {
      name: "Sneakers",
      price: 1999,
      category: "Footwear",
      variants: [
        { color: "Black", size: "9", stock: 10 },
        { color: "White", size: "10", stock: 8 }
      ]
    },
    {
      name: "Smartwatch",
      price: 4999,
      category: "Electronics",
      variants: [
        { color: "Silver", size: "One Size", stock: 12 },
        { color: "Black", size: "One Size", stock: 20 }
      ]
    }
  ];

  try {
    await Product.insertMany(sampleData);
    res.json({ message: "✅ Sample products inserted successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📄 Get All Products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔍 Get Products by Category
app.get("/api/products/category/:category", async (req, res) => {
  const category = req.params.category;
  const result = await Product.find({ category });
  res.json(result);
});

// 🧩 Get Only Variant Details (Projection)
app.get("/api/products/variants", async (req, res) => {
  const result = await Product.find({}, { name: 1, "variants.color": 1, "variants.stock": 1 });
  res.json(result);
});

// ============================================
// 🚀 Start Server
// ============================================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
