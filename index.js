const express = require("express");
const app = express();

// To parse incoming post requests aka "pushes"
// from Slack Events API
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let payload;

app.get("/", (req, res, next) => {
	res.send(payload);
})

app.post("/message", (req, res, next) => {
	payload = req.body;
	res.status(200).json({"Ok":"Received"});
});

app.listen(
	process.env.PORT || 8080,
	() => console.log("Server started!")
	);
