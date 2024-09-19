const express = require("express");


const {
  getAllBooks,
  addNewBook,
  deleteBook,
  getSingleBookDetails,
  updateBookDetails
} = require("../controllers/booksControllers");


const router = express.Router();

router.get("/books", getAllBooks);
router.get("/book/:id", getSingleBookDetails);
router.post("/book", addNewBook);
router.put("/book/:id", updateBookDetails);
router.delete("/book/:id", deleteBook);


module.exports = router;
