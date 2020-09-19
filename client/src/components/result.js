import React from "react";
import { useBookContext } from "../utils/GlobalState";
import { STATES } from "mongoose";
import { SAVE_BOOK } from "../utils/actions";
import API from "../utils/API";
import "./result.css";

function ResultsList() {
  const [state, dispatch] = useBookContext();

  function saveBook(volumeInfo) {
    dispatch({ type: SAVE_BOOK, book: volumeInfo });
    API.saveBook(volumeInfo);
  }

  return (
    <div>
      {state.searchResults ? (
        state.searchResults.map((book, index) => (
          <li key={book.id}>
            <div className="foundBook group">

              <div className='bookImage'>
                {book.volumeInfo.imageLinks ? (
                  <img src={book.volumeInfo.imageLinks.thumbnail} />
                ) : (
                  "noimage"
                )}
              </div>

              <div className='bookInfo'>
                <h2>{book.volumeInfo.title}</h2>
                <p>{book.volumeInfo.description}</p>
              </div>


              <button onClick={() => saveBook(book.volumeInfo)}> Save </button>
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
