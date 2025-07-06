const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const axios = require("axios");
const booksController = require("../controllers/booksController");

// API Routes for data pertaining to our DB
router.use("/api", apiRoutes);

// API Route to query the Google API
router.get("/google/:name", (req, res) => {
  // console.log('SENDING REQUEST: ', req);
  
  axios.get("https://www.googleapis.com/books/v1/volumes", {
    params: { q: req.params.name, maxResults: 40 }
  })
  .then(({ data }) => {
    // console.log(data.items);
    console.log('Received: ', data.items.length,' items.');
    res.json(data.items);
  })
  .catch(err => res.json(err));
});

router.route("/books")

    // Return all saved books as JSON
    .get(booksController.findAll)

    // save a new book to the database.
    .post(booksController.create);

    router
        .route("/books/:id")
        //   .get(booksController.findById)
        //   .put(booksController.update)
    
        // delete a book from the database by Mongo `_id`.
    
        .delete(booksController.remove);

// Jerome's example
// router.get("/recipes", (req, res) => {
//   axios
//     .get("http://www.recipepuppy.com/api/", { params: req.query })
//     .then(({ data: { results } }) => res.json(results))
//     .catch(err => res.status(422).json(err));
// });

// Send every other request to the React app
// Define any API routes before this runs
// router.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });


module.exports = router;
