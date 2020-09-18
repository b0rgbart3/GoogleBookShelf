import React from "react"
import {useBookContext}  from "../utils/GlobalState";
import SearchBar from "../components/searchbar";
import ResultsList from "../components/result";
import Jumbotron from "../components/Jumbotron";


function Home(){
    const [state, dispatch] = useBookContext();
    return(
        <div className="container">
          <Jumbotron />
          <SearchBar/>
          <ResultsList />
    </div>
    )
}
export default Home