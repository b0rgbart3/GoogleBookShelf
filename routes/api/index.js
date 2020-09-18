const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/books")

    // Return all saved books as JSON
    .get(booksController.findAll)

    // save a new book to the database.
    .post(booksController.create);

// Matches with "/api/books/:id"
router
    .route("/books/:id")
    //   .get(booksController.findById)
    //   .put(booksController.update)

    // delete a book from the database by Mongo `_id`.

    .delete(booksController.remove);

module.exports = router;

