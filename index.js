const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");
const { loadAdminDetails } = require("./lib/loadAdmin.js");
const { cartRouter } = require("./routes/cart.js");

const app = express();

// mongo db connection using srv link
// mongodb+srv://admin:admin123@zuitt-bootcamp.sk2eror.mongodb.net/Capstone2_API?retryWrites=true&w=majority
mongoose.connect(
  "mongodb+srv://admin:admin123@zuitt-bootcamp.sk2eror.mongodb.net/Capstone2_API?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas.")
);

loadAdminDetails();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRouter);

// port listening
if (require.main === module) {
  app.listen(process.env.PORT || 4000, () =>
    console.log(`API is now online on port ${process.env.PORT || 4000}`)
  );
}
module.exports = app;
