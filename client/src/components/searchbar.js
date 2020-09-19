import React, { useRef } from "react";
import API from "../utils/API";
import { useBookContext } from "../utils/GlobalState";
import { SEARCH_RESULTS } from "../utils/actions";
import "./searchbar.css";

const Styles = {
  search: {
    borderRadius: "90px",
    fontSize: "30px",
    fontWeight: "600"
  },
  text:{ 
      fontWeight: 900
    }

};


function SearchBar() {
  const [state,dispatch] = useBookContext();

  const searchRef = useRef();

  function handleOnSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  
    console.log("Search for: " + searchRef.current.value);
    API.googleBooks(searchRef.current.value)
    .then(results => {
        dispatch( { type: SEARCH_RESULTS, value: results.data})
    })
    .catch(err => {
      console.log(err);
    });
  
  }

  return (
   
      <div className="card searchCard">

          <h3 className="">Search for a book</h3>
        <nav className="white z-depth-2" style={Styles.search}>
          <div
            className="nav-wrapper blue lighten z-depth-0"
            style={Styles.search}
          >
            <form onSubmit={handleOnSubmit}>
              <div className="input-field z-depth-0" style={Styles.search}>
                <input id="search" type="search" style={Styles.search} ref={searchRef}></input>
                <label className="label-icon">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>
   
  );
}

export default SearchBar;
