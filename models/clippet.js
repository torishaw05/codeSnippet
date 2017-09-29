const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt     = require('bcryptjs');
const Schema     = mongoose.Schema;

// mongoose.connect('mongodb://localhost:27017/clippetUsers');



// this._emitter.setMaxListeners(50);

const clippetSchema = new mongoose.Schema ({
  username : { type: String, lowercase: true, required: true },
  title: { type: String, lowercase: true, required: true},
  clippetcode: { type: String, required: true},
  language:{ type: String, required: true},
  tags: [String],
  notes: String,
});

const Clippet = mongoose.model('Clippet', clippetSchema);

module.exports= Clippet;
