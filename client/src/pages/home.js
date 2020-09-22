import React, { useEffect } from "react"
import {useBookContext}  from "../utils/GlobalState";
import API from "../utils/API";
import { GET_ALL_BOOKS } from "../utils/actions";

import ResultsList from "../components/result";
import Jumbotron from "../components/Jumbotron";


function Home(){
  const [state, dispatch] = useBookContext();

  useEffect(() => {
    // Get all the books from our Mongo DB

    API.getBooks().then((response) => {
      //  console.log("Back from DB: " + JSON.stringify(response.data ));

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