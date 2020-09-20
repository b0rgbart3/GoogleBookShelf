import React from "react";
import { useBookContext } from "../utils/GlobalState";
//import { STATES } from "mongoose";
import { SAVE_BOOK } from "../utils/actions";
import API from "../utils/API";
import "./result.css";

function ResultsList() {
  const [state, dispatch] = useBookContext();

  function saveBook(volumeInfo) {
    dispatch({ type: SAVE_BOOK, book: volumeInfo });
    API.saveBook(volumeInfo);
  }

  function previewBook(bookPreviewUrl) {
    window.location = bookPreviewUrl;
    //window.open(bookPreviewUrl, "_blank")
  }

  // Return a shorter textString - but don't split words
  function shorten(textString, desiredLength) {
    if (!textString || textString.length < desiredLength) {
      return textString;
    }
    let split = textString.split(" ");
    let shortString = ''; 
    let splitNumber = 0;
    while( shortString.length < desiredLength  && (splitNumber < split.length)) {
      shortString += split[splitNumber] + " ";
      splitNumber++;
    }
    return shortString; 
  }

  return (
    <div className='resultsDiv'>
      {state.searchResults ? (
        state.searchResults.map((book, index) => (
          <li key={book.id}>
            <div className="foundBook group">
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


             
            </div>
          </li>
        ))
      ) : (
        <li></li>
      )}
    </div>
  );
}
export default ResultsList;
