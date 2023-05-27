const cart = require("../models/cart");
const auth = require("../auth");

async function addItemToCart(req, res) {
  let data = auth.decode(req.headers.authorization);

  const body = req.body;

  const exists = await cart.findOne({ productId: body._id });

  if (exists) {
    return res.json({ error: "Already added" });
  }

  body.userId = data.id;
  body.productId = body._id;
  body.quantity = 1;
  body.subtotal = body.price * body.quantity;

  delete body._id;

  const db = await cart.create(body);
  res.json(db);
}

async function getCartItems(req, res) {
  const data = await cart.find({});

  res.json(data);
}

async function removeCartItem(req, res) {
  const productId = req.params.productId;

  const data = await cart.findByIdAndDelete(productId);

  console.log(data);

  res.json({ message: "deleted" });
}

module.exports = { addItemToCart, getCartItems, removeCartItem };
