// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function get_Date(s)
{
  if (s == "") return new Date();
  if (!isNaN(Number(s))) s = Number(s);
  return new Date(s);
}

function get_result(s = "")
{
  let date = get_Date(s);
  let res = {
    unix : date.getTime(),
    utc : date.toUTCString()
  }
  console.log(typeof res.unix);
  if (res.utc == "Invalid Date") return { error : "Invalid Date" }
  return res;
}

app.get('/api', (req,res) =>{
  res.json(get_result());
});


app.get("/api/:info",function (req,res){
  let s = req.params.info;
  res.json(get_result(s));
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
