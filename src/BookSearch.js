import React from 'react'
import * as BooksAPI from './BooksAPI'
import * as Constants from './Constants'
import * as Utils from './Utils'

import './App.css'

import Book from './Book'
import BookShelf from './BookShelf'

import * as BooksApiTest from './BooksApiTest'



class BookSearch extends React.Component {

	constructor(){
     super(); 
     this.state.foundBooks = BooksApiTest.createBooksList(); 
    }

	state = {
		foundBooks: []
	}

	updateBookShelf = (bookID, newShelf)=>{}

    render() {
    
    return ( 

      <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={this.props.closeSearch}>Close</a>
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
	    	   <div>

	                <BookShelf key="searchResults" 
	                 books = {this.state.foundBooks} 
	                 shelfName ="Search Results"
	                 updateBookShelf = {this.updateBookShelf}
	             />
             </div>
             </div>
     
          </div>
    	)
    }

}

export default BookSearch; 