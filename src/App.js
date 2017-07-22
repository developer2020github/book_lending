//========================================================
//My reads: book tracking application 
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Main module. 
//Defines the root React component. 
//========================================================================================

import React from 'react'
import * as BooksAPI from './BooksAPI'
import * as Constants from './Constants'
import * as Utils from './Utils'

import './App.css'

import BookShelf from './BookShelf'
import BookSearch from './BookSearch'

//import * as BooksApiTest from './BooksApiTest'

  /**
     * TODO: Instead of using  state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
    */


class BooksApp extends React.Component {
  /*constructor(){
    super(); 
    this.state.books = BooksApiTest.createBooksList(); //this can be used for local testing
  }*/
  state = {

    books: [], 
  
    showSearchPage: true
  }


componentDidMount(){
    BooksAPI.getAll().then(allBooks => this.setState({
                books: allBooks
            }))}

closeSearch  = () => this.setState({ showSearchPage: false }); 


updateBookShelf = (bookID, newShelf)=>{

     function updateBook(book){
          if (book.id===bookID){
            if (Utils.isValidShelf(newShelf)){
              book.shelf = newShelf; 
              BooksAPI.update({id: bookID}, newShelf); 
             }
          }
          return book; 
      }

      function updateState(oldState){
        
         return {books: oldState.books.map(updateBook)} 
      }

     this.setState(updateState);    
  }

  render() {
    

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch closeSearch={this.closeSearch}/>
    
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>

                <BookShelf key={Constants.SHELVES.CURRENTLY_READING} 
                 books={this.state.books.filter( book=> book.shelf===Constants.SHELVES.CURRENTLY_READING)} 
                 shelfName={Constants.SHELF_NAMES[Constants.SHELVES.CURRENTLY_READING]}
                 updateBookShelf={this.updateBookShelf}
                 />

                <BookShelf key={Constants.SHELVES.WANT_TO_READ} 
                 books={this.state.books.filter( book=> book.shelf===Constants.SHELVES.WANT_TO_READ)} 
                 shelfName={Constants.SHELF_NAMES[Constants.SHELVES.WANT_TO_READ]}
                 updateBookShelf={this.updateBookShelf}
                 />

                <BookShelf key={Constants.SHELVES.READ} 
                 books={this.state.books.filter( book=> book.shelf===Constants.SHELVES.READ)} 
                 shelfName={Constants.SHELF_NAMES[Constants.SHELVES.READ]}
                 updateBookShelf={this.updateBookShelf}
                 />

              </div>

            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
