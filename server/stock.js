const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;



const itemSchema = new mongoose.Schema({
  ticker: String,
  amount: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Create a new stock in the portfolio: takes a ticker and an amount.
router.post('/', async (req, res) => {
  console.log("ADD " + req.body.ticker);
  const item = new Item({
    ticker: req.body.ticker,
    amount: req.body.amount,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
router.get('/', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  console.log("Sell " + req.params.id);
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Edit item
router.put('/api/items/:id', async (req, res) => {
  try {
    await Item.findOneAndUpdate({
        _id: req.params.id
      },
      req.body);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Item,
  routes: router,
}