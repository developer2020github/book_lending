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
import { Link, Route } from 'react-router-dom'
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
		foundBooks: [], 
		query: ""
	}

	handleInputQuery = (e)=>{
		//console.log("query input event"); 
		//console.log(e); 
		//console.log(e.target.value); 
		this.setState({query: e.target.value.trim()}); 
		this.searchForBooks(); 

	}


  syncWithLibrary = (foundBooks)=>{
    //it appears that BooksAPI.update does not set state of books returned by search
    //this function will patch for this - ensure library and search are in sync all the time
     return foundBooks.map((book)=>{ 
        book.shelf = this.props.getLibraryBookShelf(book); 
        return book; 
        }
      )
  }
    
    searchForBooks=()=>{
      if (this.state.query ==="") {
      	this.setState({foundBooks: []})
      }else{
      	    BooksAPI.search(this.state.query, 10).then(allBooks => this.setState({
                foundBooks: this.syncWithLibrary(allBooks)
            }))
      }
    }

	//updateBookShelf = (bookID, newShelf)=>{}

    render() {
    	//console.log(this.state.foundBooks); 
    	//for (let i = 0; i<this.state.foundBooks.length; i++){
    	//	console.log(i); 
    	//	console.log(this.state.foundBooks[i].authors); 
    	//}
    
    return ( 

      <div className="search-books">
            <div className="search-books-bar">

              <Link className="close-search" to='/'>Close</Link>

              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.handleInputQuery}/>
                
              </div>
            </div>
          
             <div className="search-books-results">
	    	   <div>

	                <BookShelf key="searchResults" 
	                 books={this.state.foundBooks} 
	                 shelfName="Search Results"
	                 updateBookShelf={this.props.updateBookShelf}
	             />
             </div>
             </div>
     
          </div>
    	)
    }

}

export default BookSearch; 