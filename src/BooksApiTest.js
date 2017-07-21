/* this module is for exploration of API. 
   It also contains helper functions to facilitate local testing. 
*/
import * as BooksAPI from './BooksAPI'
import * as Constants from './Constants'

//this an example of book object returned by books API 
let bookObjectExample  = 
{ title: "The Linux Command Line", 
  subtitle: "A Complete Introduction", 
  authors: ["William E. Shotts, Jr."], 
  publisher: "No Starch Press", 
  publishedDate: "2012", 
  description: `You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. 
  The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. 
  Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus:
   file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. 
   In addition to that practical knowledge, author William Shotts reveals the philosophy 
   behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. 
   As you make your way through the book's short, easily-digestible chapters, you'll learn how to: 
   * Create and delete files, directories, and symlinks 
   * Administer your system, including networking, package installation, and process management 
   * Use standard input and output, redirection, and pipelines 
   * Edit files with Vi, the world’s most popular text editor 
   * Write shell scripts to automate common or boring tasks 
   * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial \"shell shock,\" 
   you'll find that the command line is a natural and expressive way to communicate with your computer. 
   Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's \"Evolution of a SysAdmin\""`, 
   industryIdentifiers: [{ type: "ISBN_13", identifier: "9781593273897" }, { type: "ISBN_10", identifier: "1593273894" }], 
   readingModes: { text: true, image: false }, 
   pageCount: 480, 
   printType: "BOOK", 
   categories: ["COMPUTERS"], 
   averageRating: 4, 
   ratingsCount: 2, 
   maturityRating: "NOT_MATURE", 
   allowAnonLogging: true, 
   contentVersion: "1.2.2.0.preview.2", 
   panelizationSummary: { "containsEpubBubbles": false, "containsImageBubbles": false }, 
   imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api", thumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" }, 
   language: "en", 
   previewLink: "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api", 
   infoLink: "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api", 
   canonicalVolumeLink: "https://market.android.com/details?id=book-nggnmAEACAAJ", 
   id: "nggnmAEACAAJ", 
   shelf: "currentlyReading" 
}


function TryGettingAllBooks() {
    //this function demos getting all the books 

    console.log("try getting all books");
    let allBooksPromise = BooksAPI.getAll();
    console.log("promise object"); 
    console.log(allBooksPromise);

    allBooksPromise.then(function(allBooks) {
        console.log("promise resolved!"); 
        console.log(allBooks); // "Stuff worked!"
        //all books is an array of objects as per bookObjectExample above 
        console.log(JSON.stringify(allBooks[0])); 
    }, function(err) {
        console.log("error, no books data available")
        console.log(err); // Error: "It broke"
    });

}

function TryGettingOneBook(){
    //this functions tests getting one book
    console.log("try getting one book"); 
    let bookID = "nggnmAEACAAJ"; 

    let oneBookPromise  = BooksAPI.get(bookID); 

    oneBookPromise.then(function(oneBook){
        console.log("one book promise resolved"); 
        //this logs one book object as per one above bookObjectExample
        console.log(oneBook); 

    }, function(err){
        console.log("error, no single book data available")
    }); 
}


function TrySettingShelf(){
//update(book, shelf)
//book: <Object> containing at minimum an id attribute
//shelf: <String> contains one of ["wantToRead", "currentlyReading", "read"]
//Returns a Promise which resolves to a JSON object containing the response data of the POST request
  console.log("trying to set shelf"); 
  let bookToUpdate= {
    id: "nggnmAEACAAJ", 
  }

  TryGettingOneBook(); 

  let updatedBook  = BooksAPI.update(bookToUpdate, "read"); 

  console.log(updatedBook); 

  TryGettingOneBook();

}


function trySearchingForBooks(){
  let query = "Tol"; 


  let bookSearchPromise  = BooksAPI.search(query, 5); 


  bookSearchPromise.then(function(allFoundBooks){
        console.log("books search promise resolved"); 
        //this logs one book object as per one above bookObjectExample
        console.log(allFoundBooks); 

    }, function(err){
        console.log("error, no data found for this query"); 
    }); 

}
function TestBooksApi() {
    console.log("hello world from book api test!");
    trySearchingForBooks(); 
    //TryGettingAllBooks();
    //TryGettingOneBook()
    //TrySettingShelf(); 
}

function createBooksListForAShelf(sizeOfList, shelf, s){
    let books = []; 
    for (let i = 0; i<sizeOfList; i++){
        books.push(Object.assign({}, bookObjectExample)); 
        books[i].shelf = shelf; 
        books[i].id = s+parseInt(i); 
        books[i].title = books[i].title + "_" +  s + "_" + parseInt(i); 

    }
 
    return books; 
}



function createBooksList(){
  return [... createBooksListForAShelf(2, Constants.SHELVES.CURRENTLY_READING, "a"), 
          ... createBooksListForAShelf(3,  Constants.SHELVES.WANT_TO_READ, "b"),
          ... createBooksListForAShelf(5,  Constants.SHELVES.READ, "c")]; 
}

export  {createBooksList}; 
export  {createBooksListForAShelf}; 
export  {TestBooksApi};
export  {bookObjectExample}; 
