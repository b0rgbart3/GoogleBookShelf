import React,{ useEffect } from "react";
import { useBookContext } from "../utils/GlobalState";
// import { Redirect } from "react-router-dom";
import API from "../utils/API";
import { GET_ALL_BOOKS, DELETE_BOOK, SORT_SAVED } from "../utils/actions";
import BookCard from "../components/BookCard";

import "./saved.css";
import { sortByPublishedDate } from "../utils/sorts";

function Saved() {
    const [state, dispatch] = useBookContext();
    useEffect(() => {
        // Get all the books from our Mongo DB

        API.getBooks().then((response) => {
            console.log("Back from DB: " + JSON.stringify(response.data ));

          dispatch( { type: GET_ALL_BOOKS, savedBooks: response.data } );
        });
      }, []);

      function removeBook(id) {


          API.deleteBook(id).then( dispatch({ type: DELETE_BOOK, id})).catch( err =>  console.log(err) );
      }
      function sortByPublishedDate() {
          dispatch( {type: SORT_SAVED, sort: "publishedDate"});
      }
      function sortByTitle() {
        dispatch( {type: SORT_SAVED, sort: "title"});
    }

    return (
        <div className="savedBooks group">
            <div className="filters group"><p className='sortTitle'>Sort By:</p>
                <div className='sortButton' onClick={()=>sortByPublishedDate()}>published date</div>
                <div className='sortButton' onClick={()=>sortByTitle()}>title</div>
            </div>
            {
                
                state.savedBooks && state.savedBooks.length > 0 ?
                state.savedBooks.map((book,index) => {
                return (
                   
                    <BookCard book={book} page="saved" key={book._id} />                  
                   
            
                )
            })
            :
            <div className="infoMessage">There aren't any books on your bookshelf.<br/><br/>Go to the search page to find some books that you are interested in.</div>
            }
            <br></br>
        </div>
    );

}

export default Saved;