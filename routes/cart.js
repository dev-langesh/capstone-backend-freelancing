const {
  addItemToCart,
  getCartItems,
  removeCartItem,
} = require("../controllers/cartController");
const auth = require("../auth.js");

const router = require("express").Router();

router.post("/add", addItemToCart);
router.get("/all", getCartItems);
router.delete("/remove/:productId", removeCartItem);

module.exports = { cartRouter: router };
