//========================================================
//My reads: book tracking application 
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This component represents a book shelf - a set of books that belong to same category.
//========================================================================================

import React from 'react'
import './App.css'
import Book from './Book'

class BookShelf extends React.Component{

  render(){
    return (

                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                  <div className="bookshelf-books">
                   
                    <ol className="books-grid">

                        {this.props.books.map((book, i)=> {
                        return <li key={book.id}> <Book bookData={book} updateBookShelf={this.props.updateBookShelf}/> </li>; 
                      })}


                    </ol>

                  </div>
                </div>
      )
  }
}

export default BookShelf; 