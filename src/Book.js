import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  chooseShelf = (e) => {
    // values[1] is the book's ID
    // values[0] is the book's shelf
    const values = e.target.value.split(' ')
    BooksAPI.update(values[1], values[0])
    this.props.onChange(values[1], values[0])
  }

  render() {
    const book = this.props.book
    return (
      <div className="book">
        <div className="book-top">
          {book['imageLinks'] && <div><img src={book['imageLinks']['thumbnail']} className="book-cover" alt="" style={{ width: 128, height: 193}}/></div>}
          <div className="book-shelf-changer">
            <select onChange={this.chooseShelf} value={book['shelf'] + " " + book['id']}>
              <option value="move" disabled>Move to...</option>
              <option value={"currentlyReading " + book['id']}>Currently Reading</option>
              <option value={"wantToRead " + book['id']}>Want to Read</option>
              <option value={"read " + book['id']}>Read</option>
              <option value={"none " + book['id']}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book['title']}</div>
        {book['authors'] && book['authors'].map((author =>
          <div className="book-authors" key={author}>{author}</div>
        ))}
      </div>
    )
  }
}

export default Book
