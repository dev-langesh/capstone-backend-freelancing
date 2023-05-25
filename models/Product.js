const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required!"],
  },
  brand: {
    type: String,
    required: [true, "Product name is required!"],
  },
  category: {
    type: String,
    required: [true, "Category is required!"],
  },
  description: {
    type: String,
    required: [true, "Category is required!"],
  },
  image: {
    type: String,
    required: [true, "Image is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required!"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Product", productSchema);
