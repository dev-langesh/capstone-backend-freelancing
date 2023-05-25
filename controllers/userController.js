const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// register a user
module.exports.registerUser = (reqBody) => {
  return User.findOne({
    $or: [{ email: reqBody.email }, { username: reqBody.username }],
  }).then((result) => {
    if (result != null && result.email == reqBody.email) {
      return "Email taken. Please login.";
    } else if (result != null && result.username == reqBody.username) {
      return "Username taken. Input another one.";
    } else {
      let newUser = new User({
        username: reqBody.username,
        email: reqBody.email,
        password: bcrypt.hashSync(reqBody.password, 10),
        mobileNo: reqBody.mobileNo,
      });

      return newUser.save().then((user, error) => {
        if (error) {
          return "Failed to save user. Please try again later!";
        } else {
          return "User successfully registered!";
        }
      });
    }
  });
};

// function to authenticate/ login a user
module.exports.loginUser = (reqBody) => {
  return User.findOne({ email: reqBody.email }).then((result) => {
    if (result == null) {
      return false;
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        reqBody.password,
        result.password
      );
      if (isPasswordCorrect) {
        return {
          access: auth.createAccessToken(result),
          isAdmin: result.isAdmin,
        };
      } else {
        return false;
      }
    }
  });
};

// function to retrieve user details
module.exports.getProfile = (profileId) => {
  return User.findById(profileId).then((result, error) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      result.password = "";

      return result;
    }
  });
};

// Set user to admin
module.exports.setAdmin = (reqBody, isAdmin) => {
  let admin = {
    isAdmin: reqBody.isAdmin,
  };
  if (isAdmin) {
    return User.findByIdAndUpdate(reqBody.id, admin).then((course, error) => {
      if (!reqBody.isAdmin) {
        return "Admin Rights Revoked";
      } else if (reqBody.isAdmin) {
        return "Admin Rights Set";
      } else {
        return "Admin could not be set.";
      }
    });
  }
  let message = Promise.resolve(
    "You don't have the access rights to do this action."
  );

  return message.then((value) => {
    return value;
  });
};
