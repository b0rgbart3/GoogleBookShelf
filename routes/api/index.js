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

router.get("/google/:query", (req, res) => {
  console.log('SENDING REQUEST: ', req);
  
  axios.get("https://www.googleapis.com/books/v1/volumes", {
    params: { q: req.params.name, maxResults: 40 }
  })
  .then(({ data }) => {
    console.log(data.items);
    res.json(data.items);
  })
  .catch(err => res.json(err));
});

module.exports = router;

