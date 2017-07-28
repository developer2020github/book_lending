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
import { Link } from 'react-router-dom'
import * as Constants from './Constants'
import './App.css'
import BookShelf from './BookShelf'


class BookShelves extends React.Component {

constructor(){
    super(); 
    //list of shelves present in the library; 
    //any other value is not allowed
    this.validShelves = [Constants.SHELVES.CURRENTLY_READING, 
                         Constants.SHELVES.WANT_TO_READ, 
                         Constants.SHELVES.READ]; 
  }


render() {

    //if data is not available yet, render only heading 
    if (!this.props.libraryDataAvailable){
          return (<div className="list-books-title"><h1>MyReads</h1></div>)
    }


    return (<div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <div>

                    {this.validShelves.map(
                            (shelf)=>{
                            return <BookShelf key={shelf} 
                            books={this.props.books.filter( book=> book.shelf===shelf)} 
                            shelfName={Constants.SHELF_NAMES[shelf]}
                            updateBookShelf={this.props.updateBookShelf}/>}
                            )}

                    </div>
                </div>
                <div className="open-search">
                    <Link className="open-search-link" to='/search'>Add book</Link>
                </div>
                               
             </div>
            )
             
        
  }
}

export default BookShelves
