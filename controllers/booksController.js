const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    // console.log('making db query for books.');
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => {  
        let data = dbModel;
        data.saved = true;
        res.json(data)   })
      .catch(err => res.status(422).json(err));
  },

// Right now we don't yet need a find by ID request

//   findById: function(req, res) {
//     db.Book
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
  create: function(req, res) {
    // console.log('BD: about to make a db posting.');
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

// right now we don't need an update request

//   update: function(req, res) {
//     db.Book
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
  remove: async function(req, res) {
    console.log('BD: about to delete: req.params.id: ', req.params.id);

        const book = await db.Book.findById(req.params.id);

    if (!book) {
      console.log("⚠️ Book not found for ID:", req.params.id);
      return res.status(404).json({ error: "Book not found" });
    }
    else {
          await book.deleteOne(); // or `book.remove()` if you're on older Mongoose

    console.log("✅ Book deleted:", req.params.id);
    }

    // db.Book
    //   .findById(req.params.id )
    //   .then(dbModel => dbModel.remove())
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }
};
