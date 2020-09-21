import React from "react";
import "./Jumbotron.css";
import SearchBar from "../components/searchbar";

function Jumbotron() {
  return (
      <div className="gJumboTron">
          <h1>Google Books Search</h1>
          <h2>Search and Save Books of Interest</h2>
          <SearchBar/>
          <div className='credit'>illustration: minear.tumblr.com</div>
        </div>
      
  );
}

export default Jumbotron;
