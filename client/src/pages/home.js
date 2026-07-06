import React, { useEffect } from "react"
import {useBookContext}  from "../utils/GlobalState";
import API from "../utils/API";
import { GET_ALL_BOOKS, CLEAR_RESULTS } from "../utils/actions";

import ResultsList from "../components/result";
import Jumbotron from "../components/Jumbotron";


function Home(){
  const [state, dispatch] = useBookContext();

  useEffect(() => {
    dispatch({ type: CLEAR_RESULTS });

    API.getBooks().then((response) => {
      dispatch( { type: GET_ALL_BOOKS, savedBooks: response.data } );
    });
  }, []);


    return(
        <div className="page">
          <Jumbotron />
          <ResultsList />
    </div>
    )
}
export default Home