// Blog model — represents a blog post / article created by an admin user

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:   { type: String, required: true, trim: true },          // article headline
  excerpt: { type: String, required: true, trim: true },          // short summary shown on cards
  content: { type: String, required: true },                       // full article body (markdown)
  tags:    { type: [String], default: [] },                        // array of tag strings
  author:  { type: String, required: true, trim: true },           // display name of the author
  authorId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // reference to the User who posted
  image:   { type: String, default: null },                        // optional cover image URL
  published: { type: Boolean, default: true },                     // draft vs published flag
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
