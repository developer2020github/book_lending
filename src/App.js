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
import { Link, Route } from 'react-router-dom'
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
  constructor(){
    super(); 
    this.validShelves = [Constants.SHELVES.CURRENTLY_READING, 
                         Constants.SHELVES.WANT_TO_READ, 
                         Constants.SHELVES.READ]; 

    //this.state.books = BooksApiTest.createBooksList(); //this can be used for local testing
  }
  state = {

    books: [], 
  
    showSearchPage: false
  }


componentDidMount(){
    BooksAPI.getAll().then(allBooks => this.setState({
                books: allBooks
            }))}


closeSearch  = () => this.setState({ showSearchPage: false }); 

isBookInLibrary(book){
    for (const b of this.state.books){
        if (b.id===book.id){
            return true; 
        }
    }

    return false; 
}


updateBookShelf = (bookToUpdate, newShelf)=>{
     if (!Utils.isValidShelf(newShelf)){
        return; 
     }

     bookToUpdate.shelf = newShelf; 

     BooksAPI.update({id: bookToUpdate.id}, newShelf); 

     if (this.isBookInLibrary(bookToUpdate)){
        //if it is already in the library - we just need to ensure shelf matches new one

                 //console.log("updateBookShelf"); 
                 function updateBook(book){
                      if (book.id===bookToUpdate.id){
                    
                          book.shelf = newShelf; 
                          //console.log("updating shelf"); 
                          //console.log(book.title); 
                          //console.log(newShelf); 
                      }
                      return book; 
                  }

                  function updateState(oldState){
                    
                     return {books: oldState.books.map(updateBook)} 
                  }

                 this.setState(updateState);    
    }else{
        //if books is not yet on the shelf, we just need to add it
          function updateStateAdd(oldState){

                     let newBooksState = oldState.books;
                     newBooksState.push(bookToUpdate); 

                     return {books: newBooksState} 
        }

        this.setState(updateStateAdd); 

    }

  }



  render() {
    console.log("app.render");
    console.log(typeof(this.state.books)); 
    console.log(this.state.books); 

    return (
      <div className="app">
          <Route path = "/search" render ={()=>{
            return <BookSearch closeSearch={this.closeSearch} updateBookShelf={this.updateBookShelf}/>
          }}
          />

           <Route exact path = "/" render ={()=>{
                    return <div className="list-books">
                        <div className="list-books-title">
                          <h1>MyReads</h1>
                        </div>

                        <div className="list-books-content">
                            <div>

                            {this.validShelves.map(
                                    (shelf)=>{
                                    return <BookShelf key={shelf} 
                                    books={this.state.books.filter( book=> book.shelf===shelf)} 
                                    shelfName={Constants.SHELF_NAMES[shelf]}
                                    updateBookShelf={this.updateBookShelf}/>}
                                    )}

                           </div>
                        </div>

                        <Link
                             to='/search'>
                            <div className="open-search">
                              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                            </div>
                        </Link>

                    </div>
                    
                }}
            />
     
      </div>)
  }
}

export default BooksApp
