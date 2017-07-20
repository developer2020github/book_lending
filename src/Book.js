import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {

  render() {
  	//console.log("book component"); 
    //console.log(this.props);
    return(

        <div className="book">
                          <div className="book-top">
                          
                            <div className="book-cover" 
                            	style={{ width: 128, 
                            			 height: 193 , 
                            		     backgroundImage:`url(${this.props.bookData.imageLinks.thumbnail})`}}>
                            </div>

                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead" selected>Want to Read</option>
                                <option value="read">Read</option>
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