const express = require("express");
const app = express();

// To parse incoming post requests aka "pushes"
// from Slack Events API
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post("/message", (req, res, next) => {
	res.status(200).json({"challenge": req.body.challenge})
});

app.listen(
	process.env.PORT || 8080,
	() => console.log("Server started!")
	);
