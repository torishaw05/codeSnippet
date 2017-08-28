const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt     = require('bcryptjs');
const Schema     = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/snipData');

const snippetSchema = new mongoose.Schema ({
  username : { type: String, lowercase: true, required: true },
  title : { type: String, lowercase: true, required: true},
  snippetcode: { type: String, required: true},
  language: { type: String, required: true},
  tags: {type: String, required: true},
  notes: String,
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports= Snippet;
