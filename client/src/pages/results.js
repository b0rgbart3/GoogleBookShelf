import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookContext } from "../utils/GlobalState";
import API from "../utils/API";
import { GET_ALL_BOOKS, SEARCH_RESULTS, STARTING_SEARCH, FINISHING_SEARCH, FINISHED_SEARCH } from "../utils/actions";
import ResultsList from "../components/result";
import Jumbotron from "../components/Jumbotron";

function justTheYear(publishedDate) {
  if (publishedDate) return publishedDate.substr(0, 4);
  return null;
}

function Results() {
  const [state, dispatch] = useBookContext();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    API.getBooks().then((response) => {
      dispatch({ type: GET_ALL_BOOKS, savedBooks: response.data });
    });
  }, []);

  useEffect(() => {
    if (!q) return;
    if (state.searchStarted) return;
    if (state.searchResults && state.searchResults.length > 0 && state.term === q) return;

    const cached = sessionStorage.getItem(`searchResults_${q}`);
    if (cached) {
      dispatch({ type: SEARCH_RESULTS, value: JSON.parse(cached) });
      return;
    }

    dispatch({ type: STARTING_SEARCH, term: q });
    API.googleBooks(q)
      .then(results => {
        dispatch({ type: FINISHING_SEARCH });
        setTimeout(() => dispatch({ type: FINISHED_SEARCH }), 500);

        let foundBooks = [];
        results.data.forEach(book => {
          if (book.volumeInfo && book.volumeInfo.title && book.volumeInfo.authors && book.volumeInfo.description &&
            book.volumeInfo.imageLinks && book.volumeInfo.previewLink && book.volumeInfo.infoLink) {
            foundBooks.push({
              google_id: book.id,
              title: book.volumeInfo.title,
              authors: book.volumeInfo.authors,
              description: book.volumeInfo.description,
              publishedDate: justTheYear(book.volumeInfo.publishedDate),
              image: book.volumeInfo.imageLinks.thumbnail,
              preview: book.volumeInfo.previewLink,
              info: book.volumeInfo.infoLink,
              ebookLink: book.saleInfo?.isEbook ? book.accessInfo?.webReaderLink : null,
            });
          }
        });
        foundBooks.sort((a, b) => (b.ebookLink ? 1 : 0) - (a.ebookLink ? 1 : 0));
        sessionStorage.setItem(`searchResults_${q}`, JSON.stringify(foundBooks));
        dispatch({ type: SEARCH_RESULTS, value: foundBooks });
      })
      .catch(err => console.log(err));
  }, [q]);

  return (
    <div className="page">
      <Jumbotron />
      <ResultsList />
    </div>
  );
}

export default Results;
