import React from "react";
import { useBookContext } from "../utils/GlobalState";
//import { STATES } from "mongoose";
// import { SAVE_BOOK } from "../utils/actions";
// import API from "../utils/API";
import "./result.css";
import BookCard from "../components/BookCard";

function ResultsList() {
  const [state, dispatch] = useBookContext();




  return (
    <div className='resultsDiv'>
    {/* {state.searchStarted ? (<p>Started</p>):(<p>Ended</p>) } */}
    {state.searchStarted ? (
      <div className={ state.searchFinished ? ('waiting done') : ('waiting')}><img src='images/waiting2.gif'></img></div>
    ) : ( <span></span> )
        
    }

    <ul>
      { state.searchResults && state.searchResults.length > 0 ? (
        state.searchResults.map((book, index) => (
          <li key={book.google_id}>
          {/* {book.volumeInfo.title} */}
          <BookCard book={book} page="search_results"/>
          </li>
        ))
      ) : (
        <li></li>
      )}
      </ul>

      {
        state.searchFinished && !state.searchResults ? (
          <p class='noresults'>We're sorry - there were no results for: {state.term}</p>
        ) : (<p></p>)
      }
    </div>
  );
}
export default ResultsList;
