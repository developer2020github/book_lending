import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Book from './Book'
import { bookObjectExample } from './BooksApiTest'

class BookShelf extends React.Component{

  render(){
    return (

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                       <Book bookData = {bookObjectExample}/>
                      </li>
                      <li>
                       <Book bookData = {bookObjectExample}/>
                      </li>
                    </ol>
                  </div>
                </div>
      )
  }
}

export default BookShelf; 