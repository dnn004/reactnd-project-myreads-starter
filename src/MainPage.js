import React from 'react'
import './App.css'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class MainPage extends React.Component {
  updateShelf = (bookID, shelf) => {
    let books = this.props.books
    let book_index = books.findIndex(book => book['id'] === bookID)
    let book_updated = books[book_index]
    book_updated['shelf'] = shelf
    books[book_index] = book_updated

    this.props.onChange(books)
  }

  render() {
    const books = this.props.books
    const readingBooks = books.filter((book) => (book['shelf'] === "currentlyReading"))
    const wantToBooks = books.filter((book) => (book['shelf'] === "wantToRead"))
    const readBooks = books.filter((book) => (book['shelf'] === "read"))
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
            <Link
                to='/search'
                style={{ textDecoration: 'none', fontSize: '22px', color: 'black'}}
              >Search Books</Link>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf books={readingBooks} shelf={"Currently Reading"} onChange={(bookID, shelf) => this.updateShelf(bookID, shelf)} />
              <BookShelf books={wantToBooks} shelf={"Want to Read"} onChange={(bookID, shelf) => this.updateShelf(bookID, shelf)} />
              <BookShelf books={readBooks} shelf={"Read"} onChange={(bookID, shelf) => this.updateShelf(bookID, shelf)} />
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default MainPage
