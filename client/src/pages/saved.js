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

        // setSort doesn't update the sort state until later - so that's why we send in the string directly.
          if (sort === "publishedDateDes") {
              setSort("publishedDateAsc");
              dispatch( {type: SORT_SAVED, sort: "publishedDateAsc"});
          } else {
            setSort("publishedDateDes");
            dispatch( {type: SORT_SAVED, sort: "publishedDateDes"});
          }
          console.log("Sorting by: ", sort);
         
          
      }
      function sortByTitle() {
        if (sort === "titleDes") {
            setSort("titleAsc");
            dispatch( {type: SORT_SAVED, sort: "titleAsc"});
        } else {
            setSort("titleDes");
            dispatch( {type: SORT_SAVED, sort: "titleDes"});
        }
        console.log("Sorting by: ", sort);
    }

    return (
        <div className="savedBooks group">
            <div className="filters group"><p className='sortTitle'>Sort By:</p>
                <div className={sort==="publishedDateAsc" || sort==="publishedDateDes" ? 'sortButton sortActive' : 'sortButton'} onClick={()=>sortByPublishedDate()}>

                published date
                  <i className="material-icons myDown">
                  { sort==="publishedDateAsc" ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }
                  
                  </i>
                </div>
                <div className={sort==="titleAsc" || sort==="titleDes" ? 'sortButton sortActive' : 'sortButton'} onClick={()=>sortByTitle()}>
                
                title 
                 <i className="material-icons myDown">
                 
                 { sort==="titleAsc" ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }
                 
                 </i>
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