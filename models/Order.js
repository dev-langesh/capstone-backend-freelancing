const mongoose = require("mongoose");
const orderSchema= new mongoose.Schema({
	userId:{
		type:String,
		required:[true, "User Id is required!"]
	},
	products:[{
			productId:{
				type:String,
				required:[true, "Product Id is required."]
			},
			productName:{
				type:String,
				required:[true, "Product Name is required."]
			},
			quantity:{
				type: Number,
				required:[true, "Product quantity is required."]
			},
			individualPrice:{
				type:Number,
				required:[true, "Product Individual Price is required."]
			}
		}],
		totalAmount:{
			type: Number,
			required: [true, "Total amount required."]
		},

		purchasedOn:{
			type:Date,
		default: new Date()
		}
})

module.exports= mongoose.model("Order", orderSchema);