import React,{ useEffect } from "react";
import { useBookContext } from "../utils/GlobalState";
// import { Redirect } from "react-router-dom";
import API from "../utils/API";
import { GET_ALL_BOOKS, DELETE_BOOK } from "../utils/actions";
import BookCard from "../components/BookCard";

import "./saved.css";

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

    return (
        <div className="savedBooks group">
            {
                state.savedBooks && state.savedBooks.length > 0 ?
                state.savedBooks.map((book,index) => {
                return (
                    <div className="savedBook group" key={book._id}>
                    <BookCard book={book} page="saved"/>

                    {/* {book.volumeInfo } */}
                 {/* <div class='savedBookImage'>
                 { (book.image!="") && (book.image != undefined) ? 
                    <img src={book.image} /> : <p>No image stored.</p> }

               </div>
                 <div class='savedBookInfo group'>
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <button onClick={()=>removeBook( book._id )}>
                        Remove Book</button> 
                </div> */}
                  
                   
                </div>)
            })
            :
            <div className="infoMessage">There aren't any books on your bookshelf.<br/><br/>Go to the search page to find some books that you are interested in.</div>
            }
            <br></br>
        </div>
    );

}

export default Saved;