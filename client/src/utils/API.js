import axios from "axios";
//import { useBookContext } from "../utils/GlobalState";

export default {
  // Gets all books



  getBooks: function() {
    return axios.get("/api/books");

  },
  // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {

    let newSavedBook = {
      id: bookData.id,
      title: bookData.title,
      authors: bookData.authors,
      description: bookData.description,
      image: bookData.image ?  bookData.image : "",
      preview: bookData.previewLink,
      info: bookData.infoLink,
    }


    return axios.post("/api/books", newSavedBook);
  },

  googleBooks: function(name) {
    return axios.get("/google/" + name);
  }
};
