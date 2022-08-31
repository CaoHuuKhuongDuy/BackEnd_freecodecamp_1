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


function checkInterger(s)
{
  return Number.isInteger(Number(s));
}

let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let days = ["Sun","Mon","Tue","Thu","Wed","Fri","Sat"];

app.get("/api/:info",function (req,res){
  let s = req.params.info;
  let date = new Date(s);
  let time = {
    hours : date.getHours().toString(),
    minute : date.getMinutes().toString(),
    second : date.getSeconds().toString()
  }
  console.log()
  let Time_Date = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} `
  function add_time()
  {
    for (let i in time)
      {
        if (time[i].length < 2) time[i] = '0' + time[i];
        Time_Date = Time_Date + time[i];
        if (i != "second") Time_Date = Time_Date + ":";
      }
    }
  Time_Date = Time_Date + "00:00:00"    
  Time_Date = Time_Date + " GMT";
  res.json({unix : date.getTime(),utc : Time_Date});
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
