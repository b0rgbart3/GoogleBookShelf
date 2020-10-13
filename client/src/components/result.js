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
    {state.startingSearch ? (
      <div className='waiting'><img src='images/waiting2.gif'></img></div>
    ) : (
      <p></p>
    ) }
    <ul>
      {state.searchResults ? (
        state.searchResults.map((book, index) => (
          <li key={book.google_id}>
          {/* {book.volumeInfo.title} */}
          <BookCard book={book} page="search_results"/>
            {/* <div className="foundBook group">
          <a href={ book.volumeInfo.previewLink } >
              <div className='bookImage'>
                {book.volumeInfo.imageLinks ? (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.id} />
                ) : (
                  "noimage"
                )}
              </div></a>

              <div className='bookInfo'>
                <h2>{ shorten(book.volumeInfo.title, 30) }</h2>
                <h3>{ shorten(book.volumeInfo.subtitle, 30)} </h3>
                <h4>Author: { (book.volumeInfo.authors && book.volumeInfo.authors[0]) ? book.volumeInfo.authors[0] : "not listed"  }</h4>
                <p>{ shorten(book.volumeInfo.description, 260) }</p>
                <button onClick={() => previewBook(book.volumeInfo.infoLink)} className="bookButton">Info</button>
                <button onClick={() => previewBook(book.volumeInfo.previewLink)} className="bookButton"> Preview </button>
                <button onClick={() => saveBook(book.volumeInfo)} className="bookButton save"> Save </button>
               
              </div>


             
            </div> */}
          </li>
        ))
      ) : (
        <li></li>
      )}
      </ul>
    </div>
  );
}
export default ResultsList;
