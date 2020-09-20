import React, { useState, useEffect } from "react";
import "./BookCard.css";
import API from "../utils/API";
import { useBookContext } from "../utils/GlobalState";
import { SAVE_BOOK, DELETE_BOOK } from "../utils/actions";

function BookCard(props) {
    let book = props.book;
    //let saved = false;
   // let savedClassString = "";
    const [state, dispatch] = useBookContext();
    const [count, setCount] = useState(0);
    const [saved, setSaved] = useState(false);
   // const [ savedClass, setSavedClass] = useState({savedClass: "bookButton save"});
   // setSavedClass("bookButton save ");
  //  let previewLink =  "";

    const Styles = {

      save: {
        opacity:"100%",
      },
      saved:{ 
        opacity:"50%",
        backgroundColor:"gray"
        }
    
    };

// /book.volumeInfo.previewLink ? book.volumeInfo.previewLink :
      // Return a shorter textString - but don't split words
  function shorten(textString, desiredLength) {
    if (!textString || textString.length < desiredLength) {
      return textString;
    }
    let split = textString.split(" ");
    let shortString = ''; 
    let splitNumber = 0;
    while( shortString.length < desiredLength  && (splitNumber < split.length)) {
      shortString += split[splitNumber] + " ";
      splitNumber++;
    }
    return shortString; 
  }

  
  useEffect(() => {
  //   // Update the document title using the browser API
  //   if (saved) {
  //     setSavedClass(`bookButton save saved`); }
  //   else {
  //     setSavedClass(`bookButton save`);
  //   }
  });

  function saveBook(book) {
    setSaved(true);
    setCount(count+1);
   // setSavedClass({savedClass: "bookButton save saved"});
    dispatch({ type: SAVE_BOOK, book:book });
    API.saveBook(book).then(nothing=> {

      console.log("saved book.");
    });

    
   
  }

  function removeBook(book) {
    console.log("About to delete: ", book);
    API.deleteBook(book._id).then( dispatch({ type: DELETE_BOOK, id: book._id})).catch( err =>  console.log(err) );
  }
  function previewBook(bookPreviewUrl) {
    window.location = bookPreviewUrl;
    //window.open(bookPreviewUrl, "_blank")
  }

 

  return (
    <div className="foundBook group">

    
        <div className="bookImage" onClick={()=>previewBook(book.preview)}>
          {book.image ? (
            <img src={book.image} alt={book.id} />
          ) : (
            "noimage"
          )}
        </div>
      

      <div className="bookInfo">
      <p>You clicked {count} times</p>
        <h2>{shorten(book.title, 30)}</h2>
        <h3>{shorten(book.subtitle, 30)} </h3>
        <h4>
          Author:{" "}
          {book.authors && book.authors[0]
            ? book.authors[0]
            : "not listed"}
        </h4>
        <p>{shorten(book.description, 260)}</p>
        <button
          onClick={() => previewBook(book.info)}
          className="bookButton"
        >
          Info
        </button>
        { book.preview ? 
        <button
          onClick={() => previewBook(book.preview)}
          className="bookButton"
        >
          {" "}
          Preview{" "}
        </button> : <span></span>}

        { props.page==="search_results" ? <button onClick={() => saveBook(book)} 
        className={  `bookButton save ${saved ? "saved" : "" }` }
        style={ saved ? Styles.saved : Styles.save }>
        
        { saved ? "saved" : "save" } </button> : <button onClick={() => removeBook(book)} className="bookButton remove">Remove</button>

        }
        
         
      </div>
    </div>
  );
}

export default BookCard;
