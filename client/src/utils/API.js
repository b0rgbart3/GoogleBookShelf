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
      publishedDate: bookData.publishedDate,
      image: bookData.image ?  bookData.image : "",
      preview: bookData.preview,
      info: bookData.info,
    }


    return axios.post("/api/books", newSavedBook);
  },

  googleBooks: function(name) {
    console.log('BD: name: ', name);

    axios.get("/api/ping")
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
  
    const books = axios.get("/api/google/" + name);
    console.log("BDOOKS: ", books);
    return books;
  }
};
