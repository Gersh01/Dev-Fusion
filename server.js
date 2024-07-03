const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const path = require("path");
const { log } = require("console");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "duo5v3ro1",
	api_key: "123456789012345",
	api_secret: "abcdeghijklmnopqrstuvwxyz1234567890"
});

const PORT = process.env.PORT || 5000;

const app = express();

app.set("port", PORT);

const corsOptions ={
	origin: ["http://localhost:5173", 
		"http://www.dev-fusion.com/", 
		"https://www.dev-fusion.com/", 
		"https://dev-fusion-production-65209ae3025b.herokuapp.com/"],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
	// res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	next();
});

const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
var client;
try {
	client = new MongoClient(url);
	client.connect;
} catch (e) {
	console.error(e);
}

//--------------------API--------------------

//Users API (includes APIs for authentication etc.)
var usersAPI = require("./api/users.js");
usersAPI.setApp(app, client);

//Projects API
var projectsAPI = require("./api/projects.js");
projectsAPI.setApp(app, client);

//Inbox API
var inboxAPI = require("./api/inbox.js");
inboxAPI.setApp(app, client);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "./frontend/dist/")));

	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "frontend", "dist", "index.html")
		);
	});
}

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});


app.post("/api/upload", (req, res) => {



const image = "https://images.unsplash.com/photo-1712237309240-aa707ccb516f?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

cloudinary.uploader.upload(image)
.then(result=> {
	console.log(result.secure_url);
})