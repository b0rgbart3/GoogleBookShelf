import React,{ useEffect, useState } from "react";
import { useBookContext } from "../utils/GlobalState";
// import { Redirect } from "react-router-dom";
import API from "../utils/API";
import { GET_ALL_BOOKS, DELETE_BOOK, SORT_SAVED } from "../utils/actions";
import BookCard from "../components/BookCard";

import "./saved.css";
import { sortByPublishedDate } from "../utils/sorts";

function Saved() {
    const [state, dispatch] = useBookContext();
    const [sort, setSort] = useState();

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
          setSort("publishedDate");
          dispatch( {type: SORT_SAVED, sort: "publishedDate"});
      }
      function sortByTitle() {
          setSort("title");
        dispatch( {type: SORT_SAVED, sort: "title"});
    }

    return (
        <div className="savedBooks group">
            <div className="filters group"><p className='sortTitle'>Sort By:</p>
                <div className={sort==="publishedDate" ? 'sortButton sortActive' : 'sortButton'} onClick={()=>sortByPublishedDate()}>

                published date
                  <i className="material-icons myDown">keyboard_arrow_down</i>
                </div>
                <div className={sort==="title" ? 'sortButton sortActive' : 'sortButton'} onClick={()=>sortByTitle()}>
                
                title 
                 <i className="material-icons myDown">keyboard_arrow_down</i>
                 </div>
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