const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: {type : Number},
  title: { type: String},
  author: { type: String},
  year: { type: Number},
  genre:{type:String}
});


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
