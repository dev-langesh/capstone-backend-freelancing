const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const auth = require("../auth.js");

// register user
router.post("/register", (req, res) => {
  userController
    .registerUser(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

// login or authenticate user
router.post("/login", (req, res) => {
  userController
    .loginUser(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

// retrieve user details
router.get("/details", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  userController
    .getProfile(userData.id)
    .then((resultFromController) => res.send(resultFromController));
});

// set user as admin
router.put("/admin", auth.verify, (req, res) => {
  let isAdmin = auth.decode(req.headers.authorization).isAdmin;
  userController
    .setAdmin(req.body, isAdmin)
    .then((resultFromController) => res.send(resultFromController));
});

module.exports = router;
