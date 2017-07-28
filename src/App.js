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
import { Route, Switch} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as Constants from './Constants'
import * as Utils from './Utils'
import './App.css'
import BookShelves from './BookShelves'
import BookSearch from './BookSearch'
import DefaultPage from './DefaultPage'


class BooksApp extends React.Component {

constructor(){
    super(); 
    //list of shelves present in the library; 
    //any other value is not allowed
    this.validShelves = [Constants.SHELVES.CURRENTLY_READING, 
                         Constants.SHELVES.WANT_TO_READ, 
                         Constants.SHELVES.READ]; 
  }

  state = {
    books: [], 
    libraryDataAvailable: false
  }


//this function gets the current list of books in the library 
//and maps it to internal state of the component
componentDidMount(){

    //do not render shelves till data is available 
    this.setState({libraryDataAvailable: false}); 

    BooksAPI.getAll().then(
                allBooks => {
                this.setState({
                books: allBooks, 
                libraryDataAvailable: true
            })})

}


//returns true if book with matching ID is already in the library
isBookInLibrary(book){
    for (const b of this.state.books){
        if (b.id===book.id){
            return true; 
        }
    }

    return false; 
}


//returns shelf of the book if it is in the library and 
//"none" otherwise
getLibraryBookShelf = (book)=>{
       for (const b of this.state.books){
        if (b.id===book.id){
            return b.shelf; 
        }
    }

    return Constants.SHELVES.NONE; 
}


//updates state of the book on request from UI; 
//if book is already in the library - changes shelf.
//If not - book gets added to the library
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
                                        )}}

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
            <h1></h1>
            <Switch>
                <Route path="/search" render={()=>{
                    return <BookSearch updateBookShelf={this.updateBookShelf} getLibraryBookShelf={this.getLibraryBookShelf}/>
                    }}
                />

                <Route exact path="/" render={()=>{
                        return<BookShelves updateBookShelf={this.updateBookShelf} books={this.state.books} libraryDataAvailable={this.state.libraryDataAvailable} />
                    }}
                />
                <Route component={DefaultPage}/>
            </Switch>
           
        </div>)
  }
}

export default BooksApp
