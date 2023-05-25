const express=require("express");
const router = express.Router();
const orderController=require("../controllers/orderController.js")
const auth=require("../auth.js")

router.post("/create", auth.verify, (req,res)=>{
	let data={
		userId:auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
		quantity: req.body.quantity,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}
	orderController.createOrder(data).then(resultFromController=>res.send(resultFromController))
})


// retrieve authenticated user order
router.get("/retrieve",auth.verify,(req,res)=>{
	let data={
		userId:auth.decode(req.headers.authorization).id
	}
	orderController.retrieveOrder(data).then(resultFromController=>res.send(resultFromController))
})

//retrieve all orders (admin)

router.get("/allOrders", auth.verify, (req,res)=>{
	let isAdmin = auth.decode(req.headers.authorization).isAdmin
	productController.getAllOrders(isAdmin).then(resultFromController=>res.send(resultFromController));
});



module.exports=router;