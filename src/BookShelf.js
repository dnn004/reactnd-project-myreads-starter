import React from 'react'
import './App.css'
import Book from "./Book"

const BookShelf = ({ books, title, onChange }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book =>
            <li key={book['id']}>
              <Book
                book={book}
                onChange={(bookID, shelf) => onChange(bookID, shelf)}
              />
            </li>
        ))}
      </ol>
    </div>
  </div>
)

export default BookShelf
