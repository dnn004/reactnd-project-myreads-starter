import React from 'react'
import './App.css'
import Book from "./Book"

class BookShelf extends React.Component {
  render() {
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book =>
                <li key={book['id']}>
                  <Book book={book} onChange={(bookID, shelf) => this.props.onChange(bookID, shelf)}>
                  </Book>
                </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
