import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import SHELVES from './shelves'

class MainPage extends React.Component {
  updateShelf = (bookID, shelf) => {
    let books = this.props.books
    let bookIndex = books.findIndex(book => book['id'] === bookID)
    let bookUpdated = books[bookIndex]
    bookUpdated['shelf'] = shelf
    books[bookIndex] = bookUpdated

    this.props.onChange(books)
  }

  render() {
    const books = this.props.books
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
            <Link
              to='/search'
              style={{ textDecoration: "none", fontSize: "22px", color: "black"}}
            >Search Books</Link>
          </div>
          <div className="list-books-content">
            <div>
              {SHELVES.map((shelf =>
                <BookShelf
                  books={books.filter((book) => (book['shelf'] === shelf['id']))}
                  title={shelf.title}
                  onChange={(bookID, shelf) => this.updateShelf(bookID, shelf)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MainPage.propTypes = {
  books: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default MainPage
