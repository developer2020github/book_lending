import React from 'react'
import * as BooksAPI from './BooksAPI'
import * as Constants from './Constants'
import * as Utils from './Utils'

import './App.css'

import Book from './Book'
import BookShelf from './BookShelf'

import * as BooksApiTest from './BooksApiTest'



class BookSearchResults extends React.Component {

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
    	   <div>

                <BookShelf key="searchResults" 
                 books = {this.state.foundBooks} 
                 shelfName ="Search Results"
                 updateBookShelf = {this.updateBookShelf}
             />
             </div>
    	)
    }

}

export default BookSearchResults; 