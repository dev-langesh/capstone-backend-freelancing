const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const auth = require("../auth.js");

// route for creating a product

router.post("/add", auth.verify, (req, res) => {
  const data = {
    product: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  productController
    .addProduct(data)
    .then((resultFromController) => res.send(resultFromController));
});

// Get all products
router.get("/all", auth.verify, async (req, res) => {
  let isAdmin = auth.decode(req.headers.authorization).isAdmin;
  const result = await productController.getAllProducts(isAdmin);

  res.json(result);
});

// Get all active products
router.get("/active", (req, res) => {
  productController
    .getAllActive()
    .then((resultFromController) => res.send(resultFromController));
});

// Get a specific product
router.get("/:productId", (req, res) => {
  console.log(req.params.productId);
  productController
    .getProduct(req.params)
    .then((resultFromController) => res.send(resultFromController));
});

// Archive specific product
router.put("/archive", auth.verify, (req, res) => {
  let isAdmin = auth.decode(req.headers.authorization).isAdmin;
  productController
    .archiveProduct(req.body, isAdmin)
    .then((resultFromController) => res.send(resultFromController));
});

// Activate specific product
router.put("/activate", auth.verify, (req, res) => {
  let isAdmin = auth.decode(req.headers.authorization).isAdmin;
  productController
    .activateProduct(req.body, isAdmin)
    .then((resultFromController) => res.send(resultFromController));
});

// Update product information
router.put("/update", auth.verify, (req, res) => {
  let isAdmin = auth.decode(req.headers.authorization).isAdmin;
  productController
    .updateProduct(req.body, isAdmin)
    .then((resultFromController) => res.send(resultFromController));
});

//Sort by category
router.post("/category", (req, res) => {
  productController
    .getCategory(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

//Sort by brand
router.post("/brand", (req, res) => {
  productController
    .getBrand(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
