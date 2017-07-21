import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Book from './Book'
import { bookObjectExample } from './BooksApiTest'

class BookShelf extends React.Component{

  render(){
    return (

                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                  <div className="bookshelf-books">
                   
                    <ol className="books-grid">

                        {this.props.books.map((book, i)=> {
                        return <li key={book.id}> <Book bookData = {book} updateBookShelf = {this.props.updateBookShelf}/> </li>; 
                      })}


                    </ol>

                  </div>
                </div>
      )
  }
}

export default BookShelf; 