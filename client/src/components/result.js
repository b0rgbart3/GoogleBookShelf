import React from "react";
import { useBookContext } from "../utils/GlobalState";
import { STATES } from "mongoose";
import { SAVE_BOOK } from "../utils/actions";
import API from "../utils/API";


function ResultsList() {
  const [state, dispatch]= useBookContext();


  function saveBook(volumeInfo) {

      dispatch({ type: SAVE_BOOK, book: volumeInfo });


      API.saveBook( volumeInfo );



  }
  



  console.log("Our current state object: " + JSON.stringify(state));

  return (
    <div>
      <ul>
      <h4>Results</h4>
        <ul className="collection with-header">
            
              

{

        state.searchResults ? 
state.searchResults.map( (book,index) => 

 <li key={book.id}>
   <div className="collection-item">
   <h2>
   { book.volumeInfo.title }</h2>
   <p>
   { book.volumeInfo.description }</p>

   <p>{
     
      book.volumeInfo.imageLinks ?
      <img src={book.volumeInfo.imageLinks.thumbnail} />
      : "noimage"
      
      }</p>


      <button onClick={()=>saveBook(book.volumeInfo)} > Save </button>

  </div>
 </li>

)
: <li></li>
        
}
          
          
        </ul>
      </ul>
    </div>
  );
}
export default ResultsList;

