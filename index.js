let Parser = require("rss-parser");
let parser = new Parser();
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// routes will go here
app.get("/api/", function(req, res) {
  var url = req.param("url");
  let rss;
  (async () => {
    let feed = await parser.parseURL(url);
    rss = feed;
    console.log(feed.title);

    /* feed.items.forEach(item => {
          console.log(item.title + ':' + item.link)
        }); */
    res.send(rss);
  })();
});

// start the server
app.listen(port);
console.log("Server started! At" + port);
