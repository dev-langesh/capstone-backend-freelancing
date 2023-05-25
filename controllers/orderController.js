const User = require("../models/User");
const Order = require ("../models/Order");
const Product = require ("../models/Product");
const bcrypt=require("bcrypt");
const auth = require("../auth");

// create order
module.exports.createOrder=async(data) =>{
	

	if(data.isAdmin){
		return "You are an Admin. You cannot do this action."
	}

	const product = await Product.findById(data.productId);
	if (product){
		let totalAmount = product.price * data.quantity;
		let newOrder = new Order({
			userId: data.userId,
			products:{
				productId: product._id,
				productName: product.name,
				quantity: data.quantity,
				individualPrice: product.price

			},
			totalAmount,
			purchasedOn: new Date()
		})

		await newOrder.save();
		console.log(newOrder);
		return "Purchased Successfully";
	} else{
		return "Product not Found!"
	}
};




// retrieve authenticated users order
module.exports.retrieveOrder=(data)=>{
	return Order.find({userId:data.userId}).then(result=>{
		return result;
	})
}

// retrieve all orders (admin)
module.exports.getAllOrders=(isAdmin)=>{
	if(isAdmin){
		return Order.find({}).then(result => {
		return result;
	})
	} else{
		return "You are not authorized to retrieve all products."
	}
}