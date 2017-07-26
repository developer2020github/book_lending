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


class BooksApp extends React.Component {
  constructor(){
    super(); 
    this.validShelves = [Constants.SHELVES.CURRENTLY_READING, 
                         Constants.SHELVES.WANT_TO_READ, 
                         Constants.SHELVES.READ]; 
  }


  state = {
    books: []
  }


componentDidMount(){
    BooksAPI.getAll().then(allBooks => this.setState({
                books: allBooks
            }))}


isBookInLibrary(book){
    for (const b of this.state.books){
        if (b.id===book.id){
            return true; 
        }
    }

    return false; 
}

getLibraryBookShelf = (book)=>{
       for (const b of this.state.books){
        if (b.id===book.id){
            return b.shelf; 
        }
    }

    return Constants.SHELVES.NONE; 
}

updateBookShelf = (bookToUpdate, newShelf)=>{
     if (!Utils.isValidShelf(newShelf)){
        return; 
     }

    bookToUpdate.shelf = newShelf; 

    BooksAPI.update({id: bookToUpdate.id}, newShelf); 

    if (this.isBookInLibrary(bookToUpdate)){
        //if it is already in the library - we just need to ensure shelf matches new one
        function updateState(oldState){
            return {books: oldState.books.map((book)=>{
                                              if (book.id===bookToUpdate.id){
                                                  book.shelf = newShelf;
                                              }
                                              return book; 
                                         }
                                        )} 
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

    return (
      <div className="app">
          <Route path="/search" render={()=>{
            return <BookSearch updateBookShelf={this.updateBookShelf} getLibraryBookShelf={this.getLibraryBookShelf}/>
          }}
          />

           <Route exact path="/" render={()=>{
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
                        <div className="open-search">
                            <Link className="open-search-link" to='/search'>Add book</Link>
                        </div>

               </div>
                    
                }}
            />
     
      </div>)
  }
}

export default BooksApp
