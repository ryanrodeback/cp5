const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");
const photos = require("./photos.js");


const User = users.model;
const Photo = photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

// upload comment
router.post("/", async (req, res) => {
  const comment = new Comment({
    user: req.body.user,
    photo: req.body.photo,
    comment: req.body.comment,
  });
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my comments
router.get("/", async (req, res) => {
  try {
    let comments = await Comment.find().sort({
      created: -1
    }).populate('photo').populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


module.exports = {
  model: Comment,
  routes: router,
}