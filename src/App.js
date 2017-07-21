import React from 'react'
import * as BooksAPI from './BooksAPI'
import * as Constants from './Constants'
import * as Utils from './Utils'

import './App.css'

import Book from './Book'
import BookShelf from './BookShelf'

import * as BooksApiTest from './BooksApiTest'



class BooksApp extends React.Component {
  /*constructor(){
    super(); 
    this.state.books = BooksApiTest.createBooksList(); //this can be used for local testing
  }*/
  
  state = {

    books: [], 
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
componentDidMount() {
    BooksAPI.getAll().then(allBooks => this.setState({
                books: allBooks
            }

        )

    )
}

  updateBookShelf = (bookID, newShelf)=>{

     function updateBook(book){
          if (book.id===bookID){
            if (Utils.isValidShelf(newShelf)){
              book.shelf = newShelf; 
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
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>

                <BookShelf key={Constants.SHELVES.CURRENTLY_READING} 
                 books = {this.state.books.filter( book=> book.shelf===Constants.SHELVES.CURRENTLY_READING)} 
                 shelfName ={Constants.SHELF_NAMES[Constants.SHELVES.CURRENTLY_READING]}
                 updateBookShelf = {this.updateBookShelf}
                 />

                <BookShelf key={Constants.SHELVES.WANT_TO_READ} 
                 books = {this.state.books.filter( book=> book.shelf===Constants.SHELVES.WANT_TO_READ)} 
                 shelfName ={Constants.SHELF_NAMES[Constants.SHELVES.WANT_TO_READ]}
                  updateBookShelf = {this.updateBookShelf}
                 />

                <BookShelf key={Constants.SHELVES.READ} 
                 books = {this.state.books.filter( book=> book.shelf===Constants.SHELVES.READ)} 
                 shelfName ={Constants.SHELF_NAMES[Constants.SHELVES.READ]}
                 updateBookShelf = {this.updateBookShelf}
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
