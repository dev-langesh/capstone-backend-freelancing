const User = require("../models/User");
const bcrypt = require("bcrypt");

async function loadAdminDetails() {
  const data = {
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin@123", 10),
    mobileNo: "1223455",
    isAdmin: true,
  };

  const admin = await User.findOne({ email: data.email });

  if (!admin) {
    const res = await User.create(data);

    console.log(res);
  }
}

module.exports = { loadAdminDetails };
