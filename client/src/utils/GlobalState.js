import React, { createContext, useReducer, useContext } from "react";
import {
    GET_ALL_BOOKS,
    SAVE_BOOK,
    DELETE_BOOK,
    SEARCH_RESULTS,
    CLEAR_RESULTS,
    SORT_SAVED,
    STARTING_SEARCH,
    FINISHED_SEARCH,
  } from "./actions";
  import {sortByPublishedDateAsc, sortByPublishedDateDes, sortByTitleAsc, sortByTitleDes} from "./sorts";


const BookContext = createContext(
{
  startingSearch: false,
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
      publishedDate: "",
      image: "",
      preview: "",
      info: "",
      date: "",
      saved: true
    }
  ],

  searchResults: [ {
    google_id: "",
    title: "",
    authors: [""],
    description: "",
    publishedDate: "",
    image: "",
    preview: "",
    info: "",
    date: false,
    saved: false

  }
  ],

  sort: ""

}


);
const { Provider } = BookContext;



const reducer = (state, action) => {
    switch (action.type) {
    
    case STARTING_SEARCH:
      return {...state, startingSearch: true,  searchResults: [] };
    case FINISHED_SEARCH:
      return {...state, startingSearch: false };

    case GET_ALL_BOOKS:
       return  {...state, savedBooks: action.savedBooks};

    case CLEAR_RESULTS:
      return {...state, searchResults: [] };

    case SORT_SAVED:
      let newSavedBooks = state.savedBooks;
      switch (action.sort) {
        case "publishedDateAsc":
          newSavedBooks = sortByPublishedDateAsc(newSavedBooks);
          break;
        case "publishedDateDes":
            newSavedBooks = sortByPublishedDateDes(newSavedBooks);
            break;
        case "titleDes":
          newSavedBooks = sortByTitleDes(newSavedBooks);
          break;
        case "titleAsc":
            newSavedBooks = sortByTitleAsc(newSavedBooks);
            break;
        default:
          
          break;
      }
      return {...state, savedBooks: newSavedBooks };
    
  
    case SAVE_BOOK:
      let newBook = action.book;
      newBook.saved = true;

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
      books.filter( book => 

        state.savedBooks.filter( savedBook => savedBook.google_id !== book.google_id)

      )
       
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
  