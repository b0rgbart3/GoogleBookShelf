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
      title: "",
      authors: [""],
      description: "",
      image: "",
      link: "",
      date: ""
    }
  ],

  searchResults: []

}


);
const { Provider } = BookContext;



const reducer = (state, action) => {
    switch (action.type) {
    case GET_ALL_BOOKS:
       return  {...state, savedBooks: action.savedBooks};
    
  
    case SAVE_BOOK:
      let newSavedBookList = state.savedBooks ? state.savedBooks : [];
      newSavedBookList.concat(action.book);
      
      return {...state, savedBooks: newSavedBookList }
  
    case DELETE_BOOK:

      return {...state, savedBooks: state.savedBooks.filter((book)=>{
         
          return book._id != action.id 
      }) };

    case SEARCH_RESULTS:
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
  