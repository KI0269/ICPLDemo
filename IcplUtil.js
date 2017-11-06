
var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var _ = require("lodash");
var icpl = require("./IcplUtil")
var dbHost = "mongodb://localhost:27017/icpldemo";
var dbObject;


MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbObject = db.collection("salesdata");
});


function getSales(req, res){
  var product = req.query.product;
  var year = req.query.year;
  var matchCond = {};

  matchCond.product = product;
  matchCond.year = year;
   
  dbObject.find(matchCond).toArray(function(err, result){
    if (result && result.length > 0) {
      res.send({"salesVolume":result[0].salesVolume});
    } else {
      res.send({"salesVolume":0});
    }
  });

}

function getRevenue(req, res){
  var product = req.body.product;
  var year = req.query.year;
  var matchCond = {};
  
  
  matchCond = {product : {$in : product}};
  matchCond.year = year;
  
  dbObject.find(matchCond).toArray(function(err, result){

  var revenue=0;
  if (result && result.length > 0) {
    for(var x in result) {
      revenue+=parseInt(result[x].revenue);
    }
    res.send({"revenue":revenue});
  } else {
    res.send({"revenue":0});
  }
  
  });
}

function getPrice(req, res){
  var product = req.query.product;
  var year = req.query.year;
  var matchCond = {};

  matchCond.product = product;
  matchCond.year = year;
    
  dbObject.find(matchCond).toArray(function(err, result){
    if (result && result.length > 0) {
      res.send({"salesPrice":result[0].salesPrice});
    } else {
      res.send({"salesPrice":0});
    }
  });

}

function getPriceTrend(req, res){

  dbObject.find({}).toArray(function(err, result){
  
  var headers=['date', 'soap', 'hairColor'];
  var elements=[];
  if (result && result.length > 0) {
    for(var x in result) {

      var soapPrice = _.result(_.find(result, {'year' : result[x].year, 'product' : 'soap'}), 'salesPrice');
      var hairColorPrice = _.result(_.find(result, {'year' : result[x].year, 'product' : 'hairColor'}), 'salesPrice');

      elements.push({'title' : result[x].year, 'values' : [soapPrice, hairColorPrice] });
    }

    res.send({"headers":headers, 'elements' : elements});
  } else {
    res.send({});
  }

  });
}

  function getSalesTrend(req, res){

  dbObject.find({}).toArray(function(err, result){
  
  var headers=['date', 'soap', 'hairColor'];
  var elements=[];
  if (result && result.length > 0) {
    for(var x in result) {

      var soapPrice = _.result(_.find(result, {'year' : result[x].year, 'product' : 'soap'}), 'salesVolume');
      var hairColorPrice = _.result(_.find(result, {'year' : result[x].year, 'product' : 'hairColor'}), 'salesVolume');

      elements.push({'title' : result[x].year, 'values' : [soapPrice, hairColorPrice] });
    }

    res.send({"headers":headers, 'elements' : elements});
  } else {
    res.send({});
  }

  });

}

function getRevenueTrend(req, res){

  dbObject.find({}).toArray(function(err, result){
  
  var headers=['date', 'soap', 'hairColor'];
  var elements=[];
  if (result && result.length > 0) {
    for(var x in result) {

      var soapPrice = _.result(_.find(result, {'year' : result[x].year, 'product' : 'soap'}), 'revenue');
      var hairColorPrice = _.result(_.find(result, {'year' : result[x].year, 'product' : 'hairColor'}), 'revenue');

      elements.push({'title' : result[x].year, 'values' : [soapPrice, hairColorPrice] });
    }

    res.send({"headers":headers, 'elements' : elements});
  } else {
    res.send({});
  }

  });

}

module.exports.getSales = getSales;
module.exports.getRevenue = getRevenue;
module.exports.getPrice = getPrice;
module.exports.getPriceTrend = getPriceTrend;
module.exports.getSalesTrend = getSalesTrend;
module.exports.getRevenueTrend = getRevenueTrend;
