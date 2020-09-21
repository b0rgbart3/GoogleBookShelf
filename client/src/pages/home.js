import React from "react"
import {useBookContext}  from "../utils/GlobalState";

import ResultsList from "../components/result";
import Jumbotron from "../components/Jumbotron";


function Home(){
  //  const [state, dispatch] = useBookContext();
    return(
        <div className="page">
          <Jumbotron />
          <ResultsList />
    </div>
    )
}
export default Home