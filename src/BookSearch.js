//========================================================
//My reads: book tracking application 
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module handles the search page that allows to search for new books and 
//add them to the library. There is a search bar and a list of found books. 
//========================================================================================
import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'


class BookSearch extends React.Component {

state = {
		foundBooks: [], 
		query: ""
	}


//callback for search request from GUI
handleInputQuery = (e)=>{
		this.setState({query: e.target.value.trim()}); 
		this.searchForBooks(); 
}


//it appears that BooksAPI.update does not set state of books returned by search
//this function will patch for this - ensure library and search are in sync all the time
syncWithLibrary = (foundBooks)=>{

    return foundBooks.map((book)=>{ 
        book.shelf = this.props.getLibraryBookShelf(book); 
        return book; 
        }
      )
  }

    
//calls book search API and handles state updates 
searchForBooks=()=>{
      if (this.state.query ==="") {
      	this.setState({foundBooks: []})
      }else{
      	    BooksAPI.search(this.state.query, 10).then(allBooks => this.setState({
                foundBooks: this.syncWithLibrary(allBooks)
            }))
      }
}


render() {
    
    return ( 

      <div className="search-books">
            <div className="search-books-bar">

              <Link className="close-search" to='/'>Close</Link>

              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleInputQuery}/>
              </div>

            </div>
          
            <div className="search-books-results">
	    	    <div>

	                <BookShelf key="searchResults" 
	                 books={this.state.foundBooks} 
	                 shelfName=""
	                 updateBookShelf={this.props.updateBookShelf}
	                />
                </div>
            </div>
     
          </div>
    	)
    }

}

export default BookSearch; 