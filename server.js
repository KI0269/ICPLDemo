var express = require("express");
var icpl = require("./IcplUtil");
var myParser = require('body-parser');

var app = express();

app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json());

app.get("/price", function(req, res){
  icpl.getPrice(req, res);
});

app.get("/sales", function(req, res){
  icpl.getSales(req, res);
});

app.post("/revenue", function(req, res){
  icpl.getRevenue(req, res);
});



app.get("/priceTrend", function(req, res){
  icpl.getPriceTrend(req, res);
});

app.get("/salesTrend", function(req, res){
  icpl.getSalesTrend(req, res);
});

app.get("/revenueTrend", function(req, res){
  icpl.getRevenueTrend(req, res);
});


app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/demo.html");
  //res.render("demo");
});

app.listen("3300", function(){
  console.log('Server up: http://localhost:3300');
});
