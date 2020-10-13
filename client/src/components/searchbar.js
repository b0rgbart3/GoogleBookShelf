import React, { useRef } from "react";
import API from "../utils/API";
import { useBookContext } from "../utils/GlobalState";
import { SEARCH_RESULTS, CLEAR_RESULTS, STARTING_SEARCH, FINISHED_SEARCH } from "../utils/actions";
import "./searchbar.css";

// const Styles = {
//   search: {
//     borderRadius: "90px",
//     fontSize: "30px",
//     fontWeight: "600",

//   },
//   text:{ 
//       fontWeight: 900
//     }

// };



function SearchBar() {
  const [state,dispatch] = useBookContext();

  const searchRef = useRef();


  function clearField() {
  
    searchRef.current.value = "";
    dispatch( { type: CLEAR_RESULTS });
  }

  function justTheYear(publishedDate) {
    if (publishedDate) {
    return publishedDate.substr(0,4);
    } else {
      return null;
    }
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  
    console.log("Search for: " + searchRef.current.value);

    dispatch( { type: STARTING_SEARCH });

    API.googleBooks(searchRef.current.value)
    .then(results => {
      console.log("Got results.");

      let waiter = setTimeout( function() {
        dispatch( { type: FINISHED_SEARCH });
      }, 3000);
      
    

      // When we get the results back from Google - let's parse out the data so we only keep
      // the subset of data that we want for our app

        let foundBooks = [];
        results.data.map( book => {

          // only keep the books that have all the relevant info we need 
          if (book.volumeInfo && book.volumeInfo.title && book.volumeInfo.authors && book.volumeInfo.description &&
            book.volumeInfo.imageLinks && book.volumeInfo.previewLink && book.volumeInfo.infoLink ) {
              let newBook =  {    
              google_id: book.id,
              title: book.volumeInfo.title,
              authors: book.volumeInfo.authors,
              description: book.volumeInfo.description,
              publishedDate: justTheYear(book.volumeInfo.publishedDate),
              image: book.volumeInfo.imageLinks.thumbnail,
              preview: book.volumeInfo.previewLink,
              info: book.volumeInfo.infoLink };

              foundBooks.push(newBook);
          }
        })
       // console.log(foundBooks);
       dispatch( { type: SEARCH_RESULTS, value: foundBooks})
    })
    .catch(err => {
      console.log(err);
    });
  
  }

  return (
   
      <div className="card searchCard">

          <h3 className="">Search for a book:</h3>
        {/* <nav className="white z-depth-2" style={Styles.search}> */}
          {/* <div
            className="nav-wrapper blue lighten z-depth-0"
            style={Styles.search}
          > */}
            <form onSubmit={handleOnSubmit}>
              {/* <div className="input-field z-depth-0 inputDiv" style={Styles.search}>
                <input id="search" type="search" style={Styles.search} ref={searchRef}></input>
                <label className="label-icon">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons" onClick={clearField}>close</i>
                
              </div>
<br></br> */}
              <div>
                <div className='myInputField group'><input className='gbSearch' ref={searchRef} />
                <br></br><i className="material-icons mGlass">search</i>
                <i className="material-icons myCloser" onClick={clearField}>close</i></div>
                <button type='submit' className="startSearch">SEARCH</button>
               
              </div>
            </form>
          {/* </div> */}
        {/* </nav> */}
      </div>
   
  );
}

export default SearchBar;
