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
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

const app = express();

app.set("port", PORT);

const corsOptions = {
	origin: [
		"http://localhost:5173",
		"http://www.dev-fusion.com/",
		"https://www.dev-fusion.com/",
		"https://dev-fusion-production-65209ae3025b.herokuapp.com/",
	],
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

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
//APIs for WEB
//Users API (includes APIs for authentication etc.)
var usersWebAPI = require("./api/web/users.js");
usersWebAPI.setApp(app, client);
//Projects API
var projectsWebAPI = require("./api/web/projects.js");
projectsWebAPI.setApp(app, client);
//Inbox API
var inboxWebAPI = require("./api/web/inbox.js");
inboxWebAPI.setApp(app, client);
//APIs for Mobile
//Users API (includes APIs for authentication etc.)
var usersMobileAPI = require("./api/mobile/users.js");
usersMobileAPI.setApp(app, client);
//Projects API
var projectsMobileAPI = require("./api/mobile/projects.js");
projectsMobileAPI.setApp(app, client);
//Inbox API
var inboxMobileAPI = require("./api/mobile/inbox.js");
inboxMobileAPI.setApp(app, client);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "./frontend/dist/")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});

