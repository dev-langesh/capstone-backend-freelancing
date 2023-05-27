const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const User = require("../models/User");

// Create a new product
module.exports.addProduct = (data) => {
  if (data.isAdmin) {
    let newProduct = new Product({
      name: data.product.name,
      brand: data.product.brand,
      category: data.product.category,
      description: data.product.description,
      price: data.product.price,
      quantity: data.product.quantity,
      image: data.product.image,
    });

    return newProduct.save().then((product, error) => {
      if (error) {
        return error;
      } else {
        return product;
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

// Get all products (admin)
module.exports.getAllProducts = async (isAdmin) => {
  //   if (isAdmin) {
  const data = await Product.find({});

  return data;
  //   } else {
  // return "You are not authorized to retrieve all products.";
  //   }
};

//  Get all Active Products
module.exports.getAllActive = () => {
  return Product.find({ isActive: true }).then((result) => {
    return result;
  });
};

// Get Specific Product
module.exports.getProduct = (reqParams) => {
  return Product.findById(reqParams.productId).then((result) => {
    return result;
  });
};

// Archive Product

module.exports.archiveProduct = (reqBody, isAdmin) => {
  let archivedProduct = {
    isActive: false,
  };
  if (isAdmin) {
    return Product.findByIdAndUpdate(reqBody.id, archivedProduct).then(
      (course, error) => {
        if (error) {
          return "Product could not be archived.";
        } else {
          return "Product Archived";
        }
      }
    );
  }
  let message = Promise.resolve(
    "You don't have the access rights to do this action."
  );

  return message.then((value) => {
    return value;
  });
};

// activate product

module.exports.activateProduct = (reqBody, isAdmin) => {
  let activateProduct = {
    isActive: true,
  };
  if (isAdmin) {
    return Product.findByIdAndUpdate(reqBody.id, activateProduct).then(
      (course, error) => {
        if (error) {
          return "Product could not be activated.";
        } else {
          return "Product Activated";
        }
      }
    );
  }
  let message = Promise.resolve(
    "You don't have the access rights to do this action."
  );

  return message.then((value) => {
    return value;
  });
};

// Update Product
module.exports.updateProduct = (reqBody, isAdmin) => {
  let updatedProduct = {
    name: reqBody.name,
    brand: reqBody.brand,
    category: reqBody.category,
    description: reqBody.description,
    price: reqBody.price,
    quantity: reqBody.quantity,
  };
  if (isAdmin) {
    return Product.findByIdAndUpdate(reqBody.id, updatedProduct).then(
      (course, error) => {
        if (error) {
          return "Product could not be updated.";
        } else {
          return "Product Updated";
        }
      }
    );
  }
  let message = Promise.resolve(
    "You don't have the access rights to do this action."
  );

  return message.then((value) => {
    return value;
  });
};

//Get products of the same category
module.exports.getCategory = (reqBody) => {
  return Product.find({ category: reqBody.category }).then((result) => {
    return result;
  });
};

//Get products of the same brand
module.exports.getBrand = (reqBody) => {
  return Product.find({ brand: reqBody.brand }).then((result) => {
    return result;
  });
};

async function deleteProduct(req, res) {
  const { id } = req.params;

  console.log(id);

  const result = await Product.findByIdAndDelete(id);

  console.log(result);

  res.json({ message: "deleted" });
}

module.exports.deleteProduct = deleteProduct;
