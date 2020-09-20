import React, { createContext, useReducer, useContext } from "react";
import {
    GET_ALL_BOOKS,
    SAVE_BOOK,
    DELETE_BOOK,
    SEARCH_RESULTS
  } from "./actions";


const BookContext = createContext(
{
  savedBooks: [
    {
      // title: "",
      // authors: [""],
      // description: "",
      // image: "",
      // link: "",
      // date: ""
      google_id: "",
      title: "",
      authors: [""],
      description: "",
      image: "",
      preview: "",
      info: ""
    }
  ],

  searchResults: [ {
    google_id: "",
    title: "",
    authors: [""],
    description: "",
    image: "",
    preview: "",
    info: "",

  }
  ]

}


);
const { Provider } = BookContext;



const reducer = (state, action) => {
    switch (action.type) {
    case GET_ALL_BOOKS:
       return  {...state, savedBooks: action.savedBooks};
    
  
    case SAVE_BOOK:
      let newBook = action.book;

      // we want to update the bookInfo in the searchResults so that we can respond when the user saves the book

      // let gsBookObject = state.searchResults.filter( book => book.google_id === newBook.google_id} );
      // console.log("gsBookObject: ", gsBookObject);

      // if (gsBookObject && gsBookObject[0]) {
      //   gsBookObject[0].savedClass = "bookButton save saved";
      // }
     // newBook.savedClass = "bookButton save saved";

      let newSavedBookList = state.savedBooks ? state.savedBooks : [];
      newSavedBookList.concat(newBook);
      
      return {...state, savedBooks: newSavedBookList }
  
    case DELETE_BOOK:

      return {...state, savedBooks: state.savedBooks.filter((book)=>{
         
          return book._id !== action.id 
      }) };

    case SEARCH_RESULTS:
      let books = action.value;
     // books.map( book => { book.savedClass = "bookButton save";})
      return {...state, searchResults:action.value }
  
    default:
      return state;
    }
  };

  const BookProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {});
  
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  const useBookContext = () => {
    return useContext(BookContext);
  };
  
  export { BookProvider, useBookContext };
  