const jwt = require("jsonwebtoken");
const secret = "Capstone2";

module.exports.createAccessToken = (user) =>{
	// this serves as our payload
	const data = {
		id: user._id,
		email:user.email,
		isAdmin: user.isAdmin
	};
	return jwt.sign(data,secret,{});
}

// Token Verification
// checking if the user is legitimate and the info was not tampered with 

module.exports.verify=(req,res,next) =>{
	// Token is retrieved from the request header
	// auth tab > bearer token

	let token = req.headers.authorization;
	
	//main if - check if may laman ang token
	 //nested if - if token has been tampered with  

	// If token is not undefined
	if(typeof token !==undefined){
		// console.log(token);

		// The "slice" method takes only the token from the information sent via the request header
		// The token sent is a type of "Bearer" token which when recieved contains the word "Bearer " as a prefix to the string
		// This removes the "Bearer " prefix and obtains only the token for verification
		token=token.slice(7,token.length);
		return jwt.verify(token, secret, (error,data)=>{
			// if JWT is not valid
			if (error){
				return res.send({auth:"failed"});
			}else{
				// Allows the application to proceed with the next middleware function/callback function in the route
				// The verify method will be used as a middleware in the route to verify the token before proceeding to the function that invokes the controller function
				next();
			}

		})
	}else{
		return res.send({auth:"failed"})
	}
}

// Token Decryption
module.exports.decode=(token)=>{
	// if token is not undefined
	if(typeof token !== "undefined"){
		// retrieve only the token
		token = token.slice(7, token.length);
		return jwt.verify(token,secret,(error,data)=>{
			if(error){
				return null;
			}else{
				// The "decode" method is used to obtain the information from the JWT
				// The "{complete:true}" option allows us to return additional information from the JWT token
				// Returns an object with access to the "payload" property which contains user information stored when the token was generated
				// The payload contains information provided in the "createAccessToken" method defined above (e.g. id, email and isAdmin)

				return jwt.decode(token,{complete:true}).payload
			}
		})
	}else{
		return null;
	}
}
