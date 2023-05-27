const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required!"],
  },
  userId: {
    type: String,
    required: [true, "Product name is required!"],
  },
  productId: {
    type: String,
    required: [true, "Product name is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required!"],
  },
  subtotal: {
    type: Number,
    required: [true, "Quantity is required!"],
  },
});

module.exports = mongoose.model("Cart", productSchema);
