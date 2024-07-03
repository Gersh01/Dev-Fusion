require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});



const image = "https://images.unsplash.com/photo-1712237309240-aa707ccb516f?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


(async () => {

    const result = await cloudinary.uploader.upload(image);
    
    console.log(result.secure_url);
})();