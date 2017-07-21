import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import * as Constants from './Constants'

class Book extends React.Component {

  shelfChangeHandler(e){
    console.log("hello from book change shelf"); 
    console.log(e.target.value); 
    console.log(this.props);
    this.props.updateBookShelf(this.props.bookData.id, e.target.value); 
  }

  render() {
  	console.log("book component"); 
    console.log(this.props);
    return(

        <div className="book">
                          <div className="book-top">
                          
                            <div className="book-cover" 
                            	style={{ width: 128, 
                            			 height: 193 , 
                            		     backgroundImage:`url(${this.props.bookData.imageLinks.thumbnail})`}}>
                            </div>

                            <div className="book-shelf-changer">
                              <select onChange = {this.shelfChangeHandler.bind(this)}>
                                <option value="none" disabled>Move to...</option>
                                <option value={Constants.SHELVES.CURRENTLY_READING}>{Constants.SHELF_NAMES[Constants.SHELVES.CURRENTLY_READING]}</option>
                                <option value={Constants.SHELVES.WANT_TO_READ}>{Constants.SHELF_NAMES[Constants.SHELVES.WANT_TO_READ]}</option>
                                <option value={Constants.SHELVES.READ}>{Constants.SHELF_NAMES[Constants.SHELVES.READ]}</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{this.props.bookData.title}</div>
                          <div className="book-authors">{this.props.bookData.authors.join(' ')}</div>
          </div>
      )
  }

}

export default Book; 