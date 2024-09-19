const Book = require("../models/booksModel");

const isValidYear = (year) => {
  const numString = year.toString();
  return numString.length == 4 && /^[1-9]\d{3}$/.test(numString);
};

module.exports.addNewBook = async (req, res) => {
  try {

    const { title, author, year, genre } = req.body;

    const book = new Book({
      title,
      author,
      year,
      genre,
    });

    if(!isValidYear(year)){
      return res
      .status(400)
      .json({ message: "Year should be in YYYY format" });
    }
    
    if (!title || !author || !genre) {
      return res
        .status(400)
        .json({ message: "Credentials missing or wrong format" });
    }

    await book.save();
    const getBooks = await Book.find();

    res.status(201).json({ message: "Book Added sucessfully", data: getBooks });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json({ message: "Success", data: allBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getSingleBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    const details = await Book.findById({ _id: bookId });
    res.status(200).json({ message: "Success", data: details });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateBookDetails = async (req, res) => {
  try {
    const _id = req.params.id;

    const { title, author, year, genre } = req.body;


    if(!isValidYear(year)){
      return res
      .status(400)
      .json({ message: "Year should be in YYYY format" });
    }

    if (!title || !author  || !genre) {
      return res
        .status(400)
        .json({ message: "Credentials missing of wrong format" });
    }

    await Book.findByIdAndUpdate(_id, { ...req.body });

    const getUpdatedData = await Book.findById({ _id });
    res.status(200).json({ message: "Success", data: getUpdatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookRes = await Book.deleteOne({ _id: bookId });

    if (!bookRes) {
      return res.status(400).json({ message: "Book not found!" });
    }

    res
      .status(200)
      .json({ message: "Book deleted Successfully", data: bookRes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
