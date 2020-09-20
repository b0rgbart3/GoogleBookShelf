const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  id: { },
  google_id: { type: String },
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  description: String,
  image: String,
  preview: String,
  info: String,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

// Example of the entire book object returned from Google API:
// (of which we are storing only a subset -- mostly from the Volume Info )

    // "kind": { type: String },
    // "id": { type: String, required: true },
    // "etag": { type: String },
    // "selfLink": { type: String },
    // "volumeInfo": {
    //     "title": { type: String, required: true },
    //     "subtitle": { type: String },
    //     "authors": [
    //       { type: [] },
    //     ],
    //     "publisher": { type: String, required: true },
    //     "publishedDate": { type: String, },
    //     "description": { type: String },
    //     "industryIdentifiers": [
    //         {
    //             "type": { type: String },
    //             "identifier": { type: String },
    //         },
    //         {
    //             "type": "ISBN_13",
    //             "identifier": "9780826215499"
    //         }
    //     ],
    //     "readingModes": {
    //         "text": true,
    //         "image": true
    //     },
    //     "pageCount": 418,
    //     "printType": "BOOK",
    //     "categories": [
    //         "Literary Criticism"
    //     ],
    //     "averageRating": 4.5,
    //     "ratingsCount": 13,
    //     "maturityRating": "NOT_MATURE",
    //     "allowAnonLogging": false,
    //     "contentVersion": "2.0.5.0.preview.3",
    //     "panelizationSummary": {
    //         "containsEpubBubbles": false,
    //         "containsImageBubbles": false
    //     },
    //     "imageLinks": {
    //         "smallThumbnail": "http://books.google.com/books/content?id=iO5pApw2JycC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    //         "thumbnail": "http://books.google.com/books/content?id=iO5pApw2JycC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    //     },
    //     "language": "en",
    //     "previewLink": "http://books.google.com/books?id=iO5pApw2JycC&pg=PA329&dq=Harry&hl=&cd=1&source=gbs_api",
    //     "infoLink": "http://books.google.com/books?id=iO5pApw2JycC&dq=Harry&hl=&source=gbs_api",
    //     "canonicalVolumeLink": "https://books.google.com/books/about/The_Ivory_Tower_and_Harry_Potter.html?hl=&id=iO5pApw2JycC"
    // },
    // "saleInfo": {
    //     "country": "US",
    //     "saleability": "NOT_FOR_SALE",
    //     "isEbook": false
    // },
    // "accessInfo": {
    //     "country": "US",
    //     "viewability": "PARTIAL",
    //     "embeddable": true,
    //     "publicDomain": false,
    //     "textToSpeechPermission": "ALLOWED",
    //     "epub": {
    //         "isAvailable": true,
    //         "acsTokenLink": "http://books.google.com/books/download/The_Ivory_Tower_and_Harry_Potter-sample-epub.acsm?id=iO5pApw2JycC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    //     },
    //     "pdf": {
    //         "isAvailable": false
    //     },
    //     "webReaderLink": "http://play.google.com/books/reader?id=iO5pApw2JycC&hl=&printsec=frontcover&source=gbs_api",
    //     "accessViewStatus": "SAMPLE",
    //     "quoteSharingAllowed": false
    // }

