require('dotenv').config();
const express = require("express");
const app = express();
const google = require("googleapis")
const authentication = require("./authentication");

// To parse incoming post requests aka "pushes"
// from Slack Events API
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
	res.send("Welome to my ultra minimalistic UI");
})

app.post("/message", (req, res, next) => {
	const payload = req.body;

	authentication.authorize()
	.then(auth => appendData(auth, payload))
	.catch(next(err));
});

// Error handler
app.use((error, req, res, next) => {
	res.json({ErrorMessage:error.message});
})

const appendData = (auth, payload) => {
	console.log("inside appendData, payload: " +JSON.stringify(payload, null,2));
  let sheets = google.sheets('v4');
  const channel = payload.channel;
  const user    = payload.user;
  const text = payload.text;
  const ts = payload.ts;

  console.log("channel: " +channel);
  console.log("user: " +user);
  console.log("text: " +text);
  console.log("ts: " +ts);


  console.log("payload: " +[channel, user, text, ts]);

  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '19S9lcfhscJx4c_FA7PrVmTfV9dlaIV7Ob0NdqvmOEYY',
    range: 'heythisiscool!A2:B',
    valueInputOption: 'USER_ENTERED',
    resource : {
    	values: [ [channel, user, text, ts]]
    }
  }, (err, response) => {
    if (err) console.log('The API returned an error: ' + err);    
    return;
  });
}

app.listen(
	process.env.PORT || 8080,
	() => console.log("Server started!")
	);
